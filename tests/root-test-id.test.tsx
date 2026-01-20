import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext, DataTestIdRoot, DataTestIdScopeContext } from "../src";

describe("DataTestIdRoot", () => {
  it("Applies the root scope value when enabled", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdRoot value="root">
          <button type="button">Save</button>
        </DataTestIdRoot>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("root");
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
          <DataTestIdRoot value="root">
            <button type="button">Save</button>
          </DataTestIdRoot>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBeNull();
  });
});
