import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext, DataTestIdRootScope, useDataTestIdScope } from "../src";

describe("DataTestIdRootScope", () => {
  it("Keeps the original value when no transformers are configured", () => {
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
          scopeTrasnformers: []
        }}
      >
        <DataTestIdRootScope value="root">
          <CaptureScope />
        </DataTestIdRootScope>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("root");
  });

  it("Provides the transformed scope value to the context", () => {
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
          scopeTrasnformers: [(value) => value.toUpperCase()]
        }}
      >
        <DataTestIdRootScope value="root">
          <CaptureScope />
        </DataTestIdRootScope>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(values[0]).toBe("ROOT");
  });
});
