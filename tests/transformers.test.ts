import { describe, expect, it } from "vitest";
import {
  convertToLowerCase,
  convertToUpperCase,
  replaceSpaceWith,
  replaceWith
} from "../src";

describe("transformers", () => {
  it("Converts values to lower case", () => {
    expect(convertToLowerCase("AbC 123")).toBe("abc 123");
  });

  it("Converts values to upper case", () => {
    expect(convertToUpperCase("AbC 123")).toBe("ABC 123");
  });

  it("Replaces whitespace using replaceSpaceWith", () => {
    const replaceSpaces = replaceSpaceWith("_");
    expect(replaceSpaces("A B  C")).toBe("A_B__C");
  });

  it("Replaces values using replaceWith", () => {
    const replaceHyphens = replaceWith(/-/g, "_");
    expect(replaceHyphens("a-b-c")).toBe("a_b_c");
  });
});
