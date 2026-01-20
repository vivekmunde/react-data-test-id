import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationProvider, useDataTestIdConfiguration } from "../src";

describe("DataTestIdConfigurationProvider", () => {
  it("Provides default values when no overrides are supplied", () => {
    const values: Array<unknown> = [];

    const CaptureDefaults = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfigurationProvider>
        <CaptureDefaults />
      </DataTestIdConfigurationProvider>
    );

    expect(values[0]).toEqual({
      enabled: true,
      dataAttributeName: "data-testid",
      scopeSeparator: "-",
      scopeTrasnformers: []
    });
  });

  it("Uses the provided enabled override", () => {
    const values: Array<unknown> = [];

    const CaptureEnabled = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfigurationProvider value={{ enabled: false }}>
        <CaptureEnabled />
      </DataTestIdConfigurationProvider>
    );

    expect(values[0]).toEqual({
      enabled: false,
      dataAttributeName: "data-testid",
      scopeSeparator: "-",
      scopeTrasnformers: []
    });
  });

  it("Uses the provided dataAttributeName override", () => {
    const values: Array<unknown> = [];

    const CaptureAttributeName = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfigurationProvider value={{ dataAttributeName: "data-x-path" }}>
        <CaptureAttributeName />
      </DataTestIdConfigurationProvider>
    );

    expect(values[0]).toEqual({
      enabled: true,
      dataAttributeName: "data-x-path",
      scopeSeparator: "-",
      scopeTrasnformers: []
    });
  });

  it("Uses the provided scopeSeparator override", () => {
    const values: Array<unknown> = [];

    const CaptureSeparator = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfigurationProvider value={{ scopeSeparator: ":" }}>
        <CaptureSeparator />
      </DataTestIdConfigurationProvider>
    );

    expect(values[0]).toEqual({
      enabled: true,
      dataAttributeName: "data-testid",
      scopeSeparator: ":",
      scopeTrasnformers: []
    });
  });

  it("Uses the provided scopeTrasnformers override", () => {
    const values: Array<unknown> = [];
    const toUpper = (value: string) => value.toUpperCase();

    const CaptureTransformers = () => {
      values.push(useDataTestIdConfiguration());
      return null;
    };

    render(
      <DataTestIdConfigurationProvider value={{ scopeTrasnformers: [toUpper] }}>
        <CaptureTransformers />
      </DataTestIdConfigurationProvider>
    );

    expect(values[0]).toEqual({
      enabled: true,
      dataAttributeName: "data-testid",
      scopeSeparator: "-",
      scopeTrasnformers: [toUpper]
    });
  });
});
