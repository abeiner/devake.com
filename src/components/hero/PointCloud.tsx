"use client";

import { useEffect, useRef } from "react";
import { usePreloader } from "@/components/preloader/PreloaderContext";

interface Point {
  x: number;
  y: number;
}

interface Particle {
  baseX: number;
  baseY: number;
  previousX: number;
  previousY: number;
  depth: number;
  size: number;
  opacity: number;
  phase: number;
  speed: number;
  driftX: number;
  orbitX: number;
  orbitY: number;
  revealDelay: number;
  red: boolean;
  trail: boolean;
}

interface Pulse {
  x: number;
  y: number;
  startedAt: number;
}

const MIN_PARTICLE_COUNT = 900;
const MAX_PARTICLE_COUNT = 2200;

function getVisibleParticleCount(width: number, height: number) {
  return Math.round(
    Math.max(
      MIN_PARTICLE_COUNT,
      Math.min(MAX_PARTICLE_COUNT, (width * height) / 580)
    )
  );
}

function createRandom(seed = 42) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createParticles(width: number, height: number, count: number) {
  const random = createRandom(Math.round(width * 13 + height * 7));
  const particles: Particle[] = [];
  const columns = Math.ceil(Math.sqrt(count * (width / height)));
  const rows = Math.ceil(count / columns);

  for (let index = 0; index < count; index += 1) {
    const depth = Math.pow(random(), 0.75);
    const cluster = random();
    const column = index % columns;
    const row = Math.floor(index / columns);
    const baseX = ((column + random()) / columns) * width;
    let baseY = ((row + random()) / rows) * height;

    /* A restrained stream influence keeps the field organic without opening
       large empty bands on narrow screens. */
    if (cluster < 0.32) {
      const stream = Math.floor(random() * 3);
      const streamY = [0.23, 0.51, 0.78][stream] * height;
      const streamTarget =
        streamY +
        Math.sin(baseX * 0.004 + stream * 2.1) * height * 0.08 +
        (random() - 0.5) * height * 0.18;
      baseY = baseY * 0.58 + streamTarget * 0.42;
    }

    const red = random() < 0.055;
    const driftDirection = random() < 0.5 ? -1 : 1;
    particles.push({
      baseX,
      baseY,
      previousX: baseX,
      previousY: baseY,
      depth,
      size: 0.4 + depth * 1 + random() * 0.38,
      opacity: 0.13 + depth * 0.34 + random() * 0.1,
      phase: random() * Math.PI * 2,
      speed: 0.42 + random() * 0.75,
      driftX:
        driftDirection * (1.5 + depth * 3.2 + random() * 1.8),
      orbitX: 4 + random() * 18,
      orbitY: 3 + random() * 12,
      revealDelay: random() * 0.82 + depth * 0.12,
      red,
      trail: depth > 0.82 && random() < 0.055,
    });
  }

  return particles;
}

function wrap(value: number, maximum: number, padding: number) {
  const range = maximum + padding * 2;
  return ((((value + padding) % range) + range) % range) - padding;
}

export default function PointCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isComplete: preloaderComplete } = usePreloader();

  useEffect(() => {
    if (!preloaderComplete) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const canvasElement: HTMLCanvasElement = canvas;
    const drawingContext: CanvasRenderingContext2D = context;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );
    const pointer: Point = { x: 0.5, y: 0.5 };
    const pointerTarget: Point = { x: 0.5, y: 0.5 };
    let width = 0;
    let height = 0;
    let mobile = false;
    let reducedMotion = motionQuery.matches;
    let particles: Particle[] = [];
    let visibleParticleCount = MIN_PARTICLE_COUNT;
    let pulses: Pulse[] = [];
    let animationFrame = 0;
    let lastFrame = 0;
    let startedAt = performance.now();
    let canvasVisible = true;
    let pointerActive = false;
    let scrollLift = 0;
    let scrollLiftTarget = 0;

    function resize() {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const previousWidth = width;
      const previousHeight = height;
      const nextWidth = canvasElement.clientWidth;
      const nextHeight = canvasElement.clientHeight;

      if (nextWidth <= 0 || nextHeight <= 0) return;

      width = nextWidth;
      height = nextHeight;
      mobile = width < 640;
      visibleParticleCount = getVisibleParticleCount(width, height);

      if (particles.length === 0) {
        particles = createParticles(width, height, MAX_PARTICLE_COUNT);
      } else if (previousWidth > 0 && previousHeight > 0) {
        const scaleX = width / previousWidth;
        const scaleY = height / previousHeight;

        for (const particle of particles) {
          particle.baseX *= scaleX;
          particle.baseY *= scaleY;
          particle.previousX *= scaleX;
          particle.previousY *= scaleY;
        }
      }

      canvasElement.width = Math.round(width * pixelRatio);
      canvasElement.height = Math.round(height * pixelRatio);
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      /* Resizing the backing store clears the canvas. Redraw synchronously so
         the point field never flashes away between resize frames. */
      draw(reducedMotion ? 0 : (performance.now() - startedAt) / 1000);
    }

    function draw(elapsed: number) {
      drawingContext.clearRect(0, 0, width, height);
      drawingContext.lineCap = "round";

      const pointerX = pointer.x * width;
      const pointerY = pointer.y * height;
      const parallaxX = (pointer.x - 0.5) * (mobile ? 15 : 34);
      const parallaxY = (pointer.y - 0.5) * (mobile ? 10 : 24);
      const activePulses = pulses.filter(
        (pulse) => elapsed - pulse.startedAt < 1.5
      );
      pulses = activePulses;

      for (let pass = 0; pass < 2; pass += 1) {
        const redPass = pass === 1;
        drawingContext.fillStyle = redPass ? "#FF3831" : "#FFFDD8";
        drawingContext.strokeStyle = redPass
          ? "rgba(255, 56, 49, 0.3)"
          : "rgba(255, 253, 216, 0.18)";

        for (
          let particleIndex = 0;
          particleIndex < visibleParticleCount;
          particleIndex += 1
        ) {
          const particle = particles[particleIndex];
          if (particle.red !== redPass) continue;

          const localTime = elapsed * particle.speed;
          const depth = 0.25 + particle.depth * 0.75;
          const streamOffset =
            Math.sin(particle.baseX * 0.005 - elapsed * 0.72 + particle.phase) *
            (3 + particle.depth * 10);
          const breathing =
            Math.sin(elapsed * 0.55 + particle.phase) * particle.depth * 5.5;
          const directionX = (particle.baseX - width * 0.5) / Math.max(width, 1);
          const directionY = (particle.baseY - height * 0.5) / Math.max(height, 1);

          let x =
            particle.baseX +
            elapsed * particle.driftX +
            Math.sin(localTime + particle.phase) * particle.orbitX +
            directionX * breathing +
            parallaxX * depth;
          let y =
            particle.baseY +
            Math.cos(localTime * 0.82 + particle.phase) * particle.orbitY +
            streamOffset +
            directionY * breathing +
            parallaxY * depth;

          x = wrap(x, width, 34);
          y = wrap(y, height, 34);

          /* Particles unfold from a compact, softly rotating cloud. */
          const revealProgress = reducedMotion
            ? 1
            : Math.max(
                0,
                Math.min(1, (elapsed - particle.revealDelay) / 0.92)
              );
          const reveal = 1 - Math.pow(1 - revealProgress, 3);
          const sourceX =
            width * 0.5 +
            Math.cos(particle.phase + elapsed * 0.35) *
              width *
              (0.025 + particle.depth * 0.065);
          const sourceY =
            height * 0.48 +
            Math.sin(particle.phase * 1.17 - elapsed * 0.28) *
              height *
              (0.02 + particle.depth * 0.055);

          x = sourceX + (x - sourceX) * reveal;
          y = sourceY + (y - sourceY) * reveal;

          /* While Hero leaves the viewport, particles rise through it. */
          if (!reducedMotion) {
            y -= scrollLift * (60 + particle.depth * 160);
          }

          /* A cursor creates a small local vortex rather than a simple offset. */
          const cursorDx = x - pointerX;
          const cursorDy = y - pointerY;
          const cursorDistance = Math.max(1, Math.hypot(cursorDx, cursorDy));
          const cursorInfluence = Math.max(
            0,
            1 - cursorDistance / (mobile ? 130 : 260)
          );
          const cursorForce = cursorInfluence * cursorInfluence * 11 * depth;
          x += (-cursorDy / cursorDistance) * cursorForce;
          y += (cursorDx / cursorDistance) * cursorForce;

          /* Red particles have a restrained magnetic pull toward the cursor. */
          let magneticGlow = 0;
          if (
            particle.red &&
            pointerActive &&
            finePointerQuery.matches &&
            !reducedMotion
          ) {
            const magneticRadius = 210;
            const magneticInfluence = Math.max(
              0,
              1 - cursorDistance / magneticRadius
            );
            const magneticForce =
              magneticInfluence *
              magneticInfluence *
              (22 + particle.depth * 24);

            x -= (cursorDx / cursorDistance) * magneticForce;
            y -= (cursorDy / cursorDistance) * magneticForce;
            magneticGlow = magneticInfluence;
          }

          let pulseGlow = 0;
          for (const pulse of activePulses) {
            const pulseAge = elapsed - pulse.startedAt;
            const pulseRadius = pulseAge * (mobile ? 230 : 360);
            const pulseDistance = Math.hypot(x - pulse.x, y - pulse.y);
            const ringDistance = Math.abs(pulseDistance - pulseRadius);
            const ringStrength = Math.max(0, 1 - ringDistance / 70);
            const fade = 1 - pulseAge / 1.5;

            if (ringStrength > 0) {
              const push = ringStrength * fade * 20 * depth;
              x += ((x - pulse.x) / Math.max(pulseDistance, 1)) * push;
              y += ((y - pulse.y) / Math.max(pulseDistance, 1)) * push;
              pulseGlow = Math.max(pulseGlow, ringStrength * fade);
            }
          }

          const scan =
            0.5 +
            0.5 *
              Math.sin(
                x * 0.011 + y * 0.006 - elapsed * 1.8 + particle.phase
              );
          const pulse = 0.78 + scan * 0.28 + pulseGlow * 0.9;
          const opacity =
            Math.min(1, particle.opacity * pulse * (1 + magneticGlow * 0.28)) *
            reveal;
          const size =
            particle.size *
            (0.32 + reveal * 0.68) *
            (1 + pulseGlow * 0.65 + magneticGlow * 0.28);

          if (revealProgress <= 0) continue;

          if (particle.trail && !reducedMotion && revealProgress > 0.35) {
            drawingContext.globalAlpha = opacity * 0.45;
            drawingContext.lineWidth = Math.max(0.5, size * 0.5);
            drawingContext.beginPath();
            drawingContext.moveTo(particle.previousX, particle.previousY);
            drawingContext.lineTo(x, y);
            drawingContext.stroke();
          }

          drawingContext.globalAlpha = opacity;
          drawingContext.beginPath();
          drawingContext.arc(x, y, size, 0, Math.PI * 2);
          drawingContext.fill();

          particle.previousX = x;
          particle.previousY = y;
        }
      }

      drawingContext.globalAlpha = 1;

      const vignette = drawingContext.createRadialGradient(
        width * 0.48,
        height * 0.46,
        Math.min(width, height) * 0.08,
        width * 0.48,
        height * 0.46,
        Math.max(width, height) * 0.72
      );
      vignette.addColorStop(0, "rgba(10, 10, 12, 0.02)");
      vignette.addColorStop(1, "rgba(10, 10, 12, 0.58)");
      drawingContext.fillStyle = vignette;
      drawingContext.fillRect(0, 0, width, height);
    }

    function animate(timestamp: number) {
      if (document.hidden || reducedMotion || !canvasVisible) return;

      const frameInterval = mobile ? 33.33 : 20;
      if (timestamp - lastFrame >= frameInterval) {
        lastFrame = timestamp;
        pointer.x += (pointerTarget.x - pointer.x) * 0.075;
        pointer.y += (pointerTarget.y - pointer.y) * 0.075;
        scrollLift += (scrollLiftTarget - scrollLift) * 0.09;
        draw((timestamp - startedAt) / 1000);
      }

      animationFrame = requestAnimationFrame(animate);
    }

    function startAnimation() {
      cancelAnimationFrame(animationFrame);
      if (document.hidden || reducedMotion || !canvasVisible) return;

      lastFrame = performance.now();
      animationFrame = requestAnimationFrame(animate);
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType && event.pointerType !== "mouse") return;
      pointerActive = true;
      pointerTarget.x = event.clientX / Math.max(window.innerWidth, 1);
      pointerTarget.y = event.clientY / Math.max(window.innerHeight, 1);
    }

    function handlePointerLeave() {
      pointerActive = false;
      pointerTarget.x = 0.5;
      pointerTarget.y = 0.5;
    }

    function handlePointerDown(event: PointerEvent) {
      pulses.push({
        x: event.clientX,
        y: event.clientY,
        startedAt: (performance.now() - startedAt) / 1000,
      });
    }

    function handleScroll() {
      scrollLiftTarget = Math.max(
        0,
        Math.min(
          1,
          window.scrollY / Math.max(height || window.innerHeight, 1)
        )
      );
    }

    function handleVisibilityChange() {
      if (document.hidden) cancelAnimationFrame(animationFrame);
      else startAnimation();
    }

    function handleMotionChange(event: MediaQueryListEvent) {
      reducedMotion = event.matches;
      cancelAnimationFrame(animationFrame);

      if (reducedMotion) {
        pointer.x = 0.5;
        pointer.y = 0.5;
        draw(0);
      } else {
        startedAt = performance.now();
        startAnimation();
      }
    }

    const canvasObserver = new IntersectionObserver(
      ([entry]) => {
        const nextVisible = entry.isIntersecting;
        if (canvasVisible === nextVisible) return;

        canvasVisible = nextVisible;
        if (canvasVisible) startAnimation();
        else cancelAnimationFrame(animationFrame);
      },
      { rootMargin: "120px 0px", threshold: 0 }
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvasElement);
    canvasObserver.observe(canvasElement);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionQuery.addEventListener("change", handleMotionChange);

    resize();
    handleScroll();
    if (!reducedMotion) {
      startAnimation();
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvasObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [preloaderComplete]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute -left-12 -right-12 top-0 bottom-0 z-0 h-full w-auto"
    />
  );
}
