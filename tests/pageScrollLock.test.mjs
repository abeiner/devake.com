import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import ts from "typescript";

// Exercise the production helper without adding a test runner dependency.
const source = readFileSync(new URL("../src/lib/pageScrollLock.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
});
const { lockPageScroll, unlockPageScroll } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
);

for (const [name, bodyExpansion, fixedExpansion] of [
  ["classic scrollbar disappears", 15, 15],
  ["browser retains the stable gutter", 0, 0],
  ["stable body gutter with expanding fixed elements", 0, 15],
  ["fractional scrollbar width", 6.5, 6.5],
]) {
  test(name, () => {
    const properties = new Map();
    const root = { style: {
      getPropertyValue: (key) => properties.get(key) ?? "",
      setProperty: (key, value) => properties.set(key, value),
      removeProperty: (key) => properties.delete(key),
    } };
    const body = {
      style: { overflow: "auto", paddingRight: "4px" },
      getBoundingClientRect: () => ({
        width: 1400 + (body.style.overflow === "hidden" ? bodyExpansion : 0),
      }),
    };
    const header = { getBoundingClientRect: () => ({
      width: 1400 + (body.style.overflow === "hidden" ? fixedExpansion : 0)
        - Number.parseFloat(properties.get("--scrollbar-compensation") || "0"),
    }) };
    const previousDocument = globalThis.document;
    const previousGetComputedStyle = globalThis.getComputedStyle;
    globalThis.document = { body, documentElement: root, querySelector: () => header };
    globalThis.getComputedStyle = () => ({ paddingRight: body.style.paddingRight });
    let stops = 0;
    let starts = 0;
    const controller = { stop: () => stops++, start: () => starts++ };

    try {
      for (let cycle = 1; cycle <= 3; cycle++) {
        lockPageScroll(controller);
        lockPageScroll(controller);
        assert.equal(body.style.overflow, "hidden");
        assert.equal(body.getBoundingClientRect().width - Number.parseFloat(body.style.paddingRight), 1396);
        assert.equal(header.getBoundingClientRect().width, 1400);
        assert.equal(stops, cycle, "repeated lock is a no-op");
        unlockPageScroll();
        unlockPageScroll();
        assert.equal(body.style.overflow, "auto");
        assert.equal(body.style.paddingRight, "4px");
        assert.equal(properties.has("--scrollbar-compensation"), false);
        assert.equal(starts, cycle, "repeated unlock is a no-op");
      }
      // Native scrolling / reduced motion: no Lenis controller is required.
      lockPageScroll();
      assert.equal(header.getBoundingClientRect().width, 1400);
      unlockPageScroll();
    } finally {
      unlockPageScroll();
      if (previousDocument === undefined) delete globalThis.document;
      else globalThis.document = previousDocument;
      if (previousGetComputedStyle === undefined) delete globalThis.getComputedStyle;
      else globalThis.getComputedStyle = previousGetComputedStyle;
    }
  });
}
