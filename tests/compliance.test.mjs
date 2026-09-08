import assert from "node:assert/strict";
import test from "node:test";
import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory()
      ? sourceFiles(path)
      : /\.(?:ts|tsx|js|jsx)$/.test(entry.name)
        ? [path]
        : [];
  });
}

test("runtime source does not add tracking, embeds, or browser storage", () => {
  const runtime = sourceFiles(join(projectRoot, "src"))
    .filter((path) => !path.includes(`${join("app", "cookies")}`))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

  for (const [label, pattern] of [
    ["cookies", /document\.cookie/i],
    ["local storage", /\blocalStorage\b/],
    ["session storage", /\bsessionStorage\b/],
    ["tracking pixels", /\b(?:gtag|fbq|clarity|hotjar|mixpanel|posthog)\s*\(/i],
    ["third-party embeds", /<iframe\b/i],
  ]) {
    assert.doesNotMatch(runtime, pattern, `unexpected ${label} code`);
  }
});

test("contact form is local, minimized, labeled, and privacy-aware", () => {
  const form = readFileSync(
    join(projectRoot, "src/components/contact/ContactForm.tsx"),
    "utf8"
  );

  assert.doesNotMatch(form, /\b(?:fetch|XMLHttpRequest|sendBeacon)\b/);
  assert.match(form, /type="email"/);
  assert.match(form, /Name <span[^>]*>\(optional\)<\/span>/);
  assert.match(form, /id="contact-privacy"/);
  assert.match(form, /href="\/privacy\/"/);
  for (const id of ["contact-name", "contact-email", "contact-brief", "contact-privacy"]) {
    assert.match(form, new RegExp(`htmlFor="${id}"`));
  }
});

test("legal and accessibility pages are present", () => {
  for (const route of ["privacy", "terms", "accessibility"]) {
    assert.equal(existsSync(join(projectRoot, "src/app", route, "page.tsx")), true);
  }
  assert.equal(existsSync(join(projectRoot, "src/app/not-found.tsx")), true);

  const privacy = readFileSync(join(projectRoot, "src/app/privacy/page.tsx"), "utf8");
  const terms = readFileSync(join(projectRoot, "src/app/terms/page.tsx"), "utf8");
  assert.match(privacy, /id="cookies"/);
  assert.match(terms, /id="payments-and-refunds"/);
});

test("Azure serves the custom not-found page with a real 404", () => {
  const config = JSON.parse(
    readFileSync(join(projectRoot, "public/staticwebapp.config.json"), "utf8")
  );

  assert.equal(config.navigationFallback, undefined);
  assert.equal(config.responseOverrides?.["404"]?.rewrite, "/404.html");
  assert.deepEqual(config.routes, [
    {
      route: "/cookies*",
      redirect: "/privacy/#cookies",
      statusCode: 301,
    },
    {
      route: "/refunds*",
      redirect: "/terms/#payments-and-refunds",
      statusCode: 301,
    },
  ]);
});

test("unused public photograph is not shipped", () => {
  assert.equal(existsSync(join(projectRoot, "public/alex-devake.jpg")), false);
});

test("plain image elements, if added, have alt attributes", () => {
  const markup = sourceFiles(join(projectRoot, "src"))
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");
  const images = markup.match(/<img\b[^>]*>/gi) ?? [];
  for (const image of images) {
    assert.match(image, /\balt=/i, `missing alt text: ${image}`);
  }
});
