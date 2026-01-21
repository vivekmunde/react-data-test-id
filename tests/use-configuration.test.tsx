import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfiguration, useDataTestIdConfiguration } from "../src";

describe("useDataTestIdConfiguration", () => {
  it("Returns the default configuration when no overrides are provided", () => {
    const values: Array<unknown> = [];

    const CaptureConfiguration = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfiguration>
        <CaptureConfiguration />
      </DataTestIdConfiguration>
    );

    expect(values[0]).toEqual({
      enabled: true,
      dataAttributeName: "data-testid",
      scopeSeparator: "-",
      scopeTrasnformers: []
    });
  });

  it("Returns the merged configuration when overrides are provided", () => {
    const values: Array<unknown> = [];

    const CaptureConfiguration = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfiguration
        value={{
          enabled: false,
          dataAttributeName: "data-x-path",
          scopeSeparator: ":"
        }}
      >
        <CaptureConfiguration />
      </DataTestIdConfiguration>
    );

    expect(values[0]).toEqual({
      enabled: false,
      dataAttributeName: "data-x-path",
      scopeSeparator: ":",
      scopeTrasnformers: []
    });
  });
});
