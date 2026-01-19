import { describe, expect, it } from "vitest";
import {
  convertCase,
  joinDataTestIds,
  normalizeDataTestIdValue,
  replaceSpace
} from "../src/data-test-id-utils";

describe("DataTestId utils", () => {
  it("Joins values with the provided separator", () => {
    expect(joinDataTestIds({ values: ["root", "child", undefined], separator: ":" })).toBe(
      "root:child"
    );
  });

  it("Normalizes values with case conversion and space replacement", () => {
    expect(
      normalizeDataTestIdValue({
        value: "Root Value",
        spaceReplacement: "_",
        caseTransform: "upper"
      })
    ).toBe("ROOT_VALUE");
  });

  it("Leaves values unchanged when no case conversion is configured", () => {
    expect(
      normalizeDataTestIdValue({
        value: "Root Value",
        spaceReplacement: "-",
        caseTransform: undefined
      })
    ).toBe("Root-Value");
  });

  it("Replaces spaces with the configured value", () => {
    expect(replaceSpace({ value: "Root Value", spaceReplacement: "_" })).toBe("Root_Value");
  });

  it("Leaves values unchanged when no space replacement is configured", () => {
    expect(replaceSpace({ value: "Root Value", spaceReplacement: undefined })).toBe("Root Value");
  });

  it("Converts values to lower case when configured", () => {
    expect(convertCase({ value: "Root", caseTransform: "lower" })).toBe("root");
  });

  it("Converts values to upper case when configured", () => {
    expect(convertCase({ value: "Root", caseTransform: "upper" })).toBe("ROOT");
  });
});
