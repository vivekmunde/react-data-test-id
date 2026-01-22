import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext, useTransformers } from "../src";

describe("useTransformers", () => {
  it("Returns the original value when no transformers are configured", () => {
    const values: Array<string> = [];

    const CaptureValue = () => {
      values.push(useTransformers("Value"));
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTransformers: []
        }}
      >
        <CaptureValue />
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("Value");
  });

  it("Applies transformers in order", () => {
    const values: Array<string> = [];
    const toUpper = (value: string) => value.toUpperCase();
    const replaceSpaces = (value: string) => value.replace(/\s/gi, "_");

    const CaptureValue = () => {
      values.push(useTransformers("a b"));
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTransformers: [toUpper, replaceSpaces]
        }}
      >
        <CaptureValue />
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("A_B");
  });
});
