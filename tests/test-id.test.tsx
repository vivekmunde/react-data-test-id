import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestId, DataTestIdConfiguration } from "../src";

describe("DataTestId", () => {
  it("Applies the scoped value when enabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: true }}>
        <DataTestId value="child">
          <button type="button">Save</button>
        </DataTestId>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("child");
  });

  it("Renders children without attributes when disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: false }}>
        <DataTestId value="child">
          <button type="button">Save</button>
        </DataTestId>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBeNull();
  });
});
