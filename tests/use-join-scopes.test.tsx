import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext, useJoinScopes } from "../src";

describe("useJoinScopes", () => {
  it("Joins segments with the default separator", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useJoinScopes(["root", "child"]));
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <CaptureScope />
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("root-child");
  });

  it("Uses a custom separator when configured", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useJoinScopes(["root", "child"]));
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: ":",
          scopeTrasnformers: []
        }}
      >
        <CaptureScope />
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("root:child");
  });

  it("Skips empty segments while joining", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useJoinScopes(["root", "", "leaf"]));
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: ":",
          scopeTrasnformers: []
        }}
      >
        <CaptureScope />
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("root:leaf");
  });
});
