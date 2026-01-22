import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import {
  DataTestIdConfigurationContext,
  DataTestIdScope,
  DataTestIdScopeContext,
  useDataTestIdScope
} from "../src";

describe("DataTestIdScope", () => {
  it("Provides a scope using the default separator", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useDataTestIdScope());
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
        <DataTestIdScope value="child">
          <CaptureScope />
        </DataTestIdScope>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("child");
  });

  it("Combines parent scope with a custom separator", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useDataTestIdScope());
      return null;
    };

    render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: ":",
          scopeTransformers: []
        }}
      >
        <DataTestIdScopeContext.Provider value="parent">
          <DataTestIdScope value="child">
            <CaptureScope />
          </DataTestIdScope>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("parent:child");
  });
});
