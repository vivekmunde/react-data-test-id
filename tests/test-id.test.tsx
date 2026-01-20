import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestId, DataTestIdConfigurationContext, DataTestIdScopeContext } from "../src";

describe("DataTestId", () => {
  it("Applies the scoped value when enabled", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdScopeContext.Provider value="">
          <DataTestId value="child">
            <button type="button">Save</button>
          </DataTestId>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("child");
  });

  it("Renders children without attributes when disabled", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: false,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdScopeContext.Provider value="">
          <DataTestId value="child">
            <button type="button">Save</button>
          </DataTestId>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBeNull();
  });
});
