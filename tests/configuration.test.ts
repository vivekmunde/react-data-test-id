import { describe, expect, it } from "vitest";
import { defaultConfiguration } from "../src/configuration";

describe("Configuration defaults", () => {
  it("Sets enabled to true", () => {
    expect(defaultConfiguration.enabled).toBe(true);
  });

  it("Uses data-testid as the default attribute name", () => {
    expect(defaultConfiguration.dataAttributeName).toBe("data-testid");
  });

  it("Uses a dash as the default scope separator", () => {
    expect(defaultConfiguration.scopeSeparator).toBe("-");
  });

  it("Initializes scope transformers as an empty array", () => {
    expect(Array.isArray(defaultConfiguration.scopeTrasnformers)).toBe(true);
    expect(defaultConfiguration.scopeTrasnformers).toHaveLength(0);
  });
});
