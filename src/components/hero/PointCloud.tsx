"use client";

import { useRef, useEffect, useCallback } from "react";

/* =============================================================
   2D Simplex Noise — Inline Implementation
   Based on Stefan Gustavson's simplex noise algorithm.
   No external library required.
   ============================================================= */

const GRAD3: [number, number][] = [
  [1, 1], [-1, 1], [1, -1], [-1, -1],
  [1, 0], [-1, 0], [0, 1], [0, -1],
];

const PERM = new Uint8Array(512);
const PERM_MOD8 = new Uint8Array(512);

// Seed the permutation table with a fixed seed for deterministic terrain
(function initPerm() {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  // Fisher-Yates shuffle with a fixed LCG PRNG (seed = 42)
  let seed = 42;
  for (let i = 255; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    const tmp = p[i];
    p[i] = p[j];
    p[j] = tmp;
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    PERM_MOD8[i] = PERM[i] % 8;
  }
})();

function simplex2D(xin: number, yin: number): number {
  const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
  const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;

  const s = (xin + yin) * F2;
  const i = Math.floor(xin + s);
  const j = Math.floor(yin + s);
  const t = (i + j) * G2;

  const X0 = i - t;
  const Y0 = j - t;
  const x0 = xin - X0;
  const y0 = yin - Y0;

  let i1: number, j1: number;
  if (x0 > y0) {
    i1 = 1; j1 = 0;
  } else {
    i1 = 0; j1 = 1;
  }

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1.0 + 2.0 * G2;
  const y2 = y0 - 1.0 + 2.0 * G2;

  const ii = i & 255;
  const jj = j & 255;

  let n0 = 0, n1 = 0, n2 = 0;

  let t0 = 0.5 - x0 * x0 - y0 * y0;
  if (t0 >= 0) {
    t0 *= t0;
    const gi0 = PERM_MOD8[ii + PERM[jj]];
    n0 = t0 * t0 * (GRAD3[gi0][0] * x0 + GRAD3[gi0][1] * y0);
  }

  let t1 = 0.5 - x1 * x1 - y1 * y1;
  if (t1 >= 0) {
    t1 *= t1;
    const gi1 = PERM_MOD8[ii + i1 + PERM[jj + j1]];
    n1 = t1 * t1 * (GRAD3[gi1][0] * x1 + GRAD3[gi1][1] * y1);
  }

  let t2 = 0.5 - x2 * x2 - y2 * y2;
  if (t2 >= 0) {
    t2 *= t2;
    const gi2 = PERM_MOD8[ii + 1 + PERM[jj + 1]];
    n2 = t2 * t2 * (GRAD3[gi2][0] * x2 + GRAD3[gi2][1] * y2);
  }

  // Returns value in [-1, 1]
  return 70.0 * (n0 + n1 + n2);
}

/* =============================================================
   Particle type and generation
   ============================================================= */

interface Particle {
  x: number;
  y: number;
  z: number;       // depth: 0 (far) to 1 (near)
  baseX: number;
  baseY: number;
  size: number;     // 1-3px range, adjusted by depth
  opacity: number;  // 0.2-0.6 range, adjusted by depth
  isRed: boolean;
  vx: number;       // continuous drift velocity
  vy: number;
}

function generateParticles(
  width: number,
  height: number,
  count: number
): Particle[] {
  const particles: Particle[] = [];
  const noiseScale = 0.003;
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let i = 0; i < count; i++) {
    let x: number, y: number;
    let attempts = 0;
    const maxAttempts = 4;

    do {
      // Bias distribution toward center using squared random radius
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.random() * maxDist;
      x = centerX + Math.cos(angle) * radius;
      y = centerY + Math.sin(angle) * radius;
      attempts++;

      // Simplex noise creates terrain-like clusters:
      // accept positions where noise is above threshold
      const noiseVal = simplex2D(x * noiseScale, y * noiseScale);
      if (noiseVal > -0.3 || attempts >= maxAttempts) break;
    } while (attempts < maxAttempts);

    // Scatter ~30% of particles across the full canvas for coverage
    if (Math.random() < 0.3) {
      x = Math.random() * width;
      y = Math.random() * height;
    }

    const z = Math.random(); // depth: 0=far, 1=near
    const baseSize = 1 + Math.random() * 2; // 1-3px
    const baseOpacity = 0.2 + Math.random() * 0.4; // 0.2-0.6
    const isRed = Math.random() < 0.08; // ~8% colored red

    // Subtle continuous drift — small random velocities
    const driftAngle = Math.random() * Math.PI * 2;
    const driftSpeed = 0.05 + Math.random() * 0.15;
    const vx = Math.cos(driftAngle) * driftSpeed;
    const vy = Math.sin(driftAngle) * driftSpeed;

    particles.push({
      x,
      y,
      z,
      baseX: x,
      baseY: y,
      size: baseSize * (0.5 + z * 0.5),       // farther = smaller
      opacity: baseOpacity * (0.4 + z * 0.6),  // farther = dimmer
      isRed,
      vx,
      vy,
    });
  }

  return particles;
}

/* =============================================================
   PointCloud Component
   ============================================================= */

export default function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 }); // normalized 0-1
  const sizeRef = useRef({ width: 0, height: 0 });
  const lastFrameTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isMobileRef = useRef(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    sizeRef.current = { width, height };
    isMobileRef.current = width < 640;

    const count = isMobileRef.current ? 1200 : 3000;
    particlesRef.current = generateParticles(width, height, count);
  }, []);

  const drawFrame = useCallback((timestamp: number) => {
    // When tab is hidden, stop scheduling new frames entirely.
    // The visibilitychange handler will restart the loop when the tab returns.
    if (!isVisibleRef.current) {
      return;
    }

    // FPS throttling: desktop ~60fps (16.67ms), mobile ~30fps (33.33ms)
    const interval = isMobileRef.current ? 33.33 : 16.67;
    const delta = timestamp - lastFrameTimeRef.current;

    if (delta < interval) {
      animationRef.current = requestAnimationFrame(drawFrame);
      return;
    }
    lastFrameTimeRef.current = timestamp - (delta % interval);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Mouse offset from center, normalized to -1..1
    const mouseOffsetX = (mouse.x - 0.5) * 2;
    const mouseOffsetY = (mouse.y - 0.5) * 2;

    // Max parallax shift in pixels
    const maxShift = 30;

    // Batch draws by color for fewer state changes
    // Draw off-white particles first, then red
    for (let pass = 0; pass < 2; pass++) {
      const isRedPass = pass === 1;
      ctx.fillStyle = isRedPass ? "#FF3831" : "#FFFDD8";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isRed !== isRedPass) continue;

        // Update drift
        p.baseX += p.vx;
        p.baseY += p.vy;

        // Wrap around edges
        if (p.baseX < -20) p.baseX = width + 20;
        else if (p.baseX > width + 20) p.baseX = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        else if (p.baseY > height + 20) p.baseY = -20;

        // Parallax: deeper z = more movement (nearer to camera)
        const parallaxFactor = p.z * 0.7 + 0.3; // 0.3 to 1.0
        const shiftX = mouseOffsetX * maxShift * parallaxFactor;
        const shiftY = mouseOffsetY * maxShift * parallaxFactor;

        p.x = p.baseX + shiftX;
        p.y = p.baseY + shiftY;

        // Draw
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
    animationRef.current = requestAnimationFrame(drawFrame);
  }, []);

  const renderStatic = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    const particles = particlesRef.current;

    ctx.clearRect(0, 0, width, height);

    for (let pass = 0; pass < 2; pass++) {
      const isRedPass = pass === 1;
      ctx.fillStyle = isRedPass ? "#FF3831" : "#FFFDD8";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.isRed !== isRedPass) continue;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.baseX, p.baseY, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.globalAlpha = 1;
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = motionQuery.matches;

    // Initialize canvas and particles
    initCanvas();

    if (prefersReducedMotion) {
      // Render once (static), no animation loop
      renderStatic();

      const handleResize = () => {
        initCanvas();
        renderStatic();
      };
      window.addEventListener("resize", handleResize);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        if (!e.matches) {
          // User turned off reduced motion — start animating
          window.removeEventListener("resize", handleResize);
          animationRef.current = requestAnimationFrame(drawFrame);
        }
      };
      motionQuery.addEventListener("change", handleMotionChange);

      return () => {
        window.removeEventListener("resize", handleResize);
        motionQuery.removeEventListener("change", handleMotionChange);
      };
    }

    // Start animation loop
    animationRef.current = requestAnimationFrame(drawFrame);

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };

    // Touch parallax (tablets)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX / window.innerWidth,
          y: e.touches[0].clientY / window.innerHeight,
        };
      }
    };

    // Visibility API: pause when tab is hidden, resume when visible.
    // drawFrame() stops scheduling new frames when isVisibleRef is false,
    // so we need to restart the loop when the tab becomes visible again.
    const handleVisibility = () => {
      const wasHidden = isVisibleRef.current === false;
      isVisibleRef.current = !document.hidden;
      if (!document.hidden && wasHidden) {
        lastFrameTimeRef.current = performance.now();
        animationRef.current = requestAnimationFrame(drawFrame);
      }
    };

    // Resize & orientation change: recalculate canvas dimensions and regenerate particles
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initCanvas();
      }, 100);
    };

    // Listen for reduced motion changes during animation
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        cancelAnimationFrame(animationRef.current);
        renderStatic();
      } else {
        animationRef.current = requestAnimationFrame(drawFrame);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [initCanvas, drawFrame, renderStatic]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
