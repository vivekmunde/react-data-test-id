import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfiguration, DataTestIdRoot } from "../src";

describe("DataTestIdRoot", () => {
  it("Applies the root scope value when enabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: true }}>
        <DataTestIdRoot value="root">
          <button type="button">Save</button>
        </DataTestIdRoot>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("root");
  });

  it("Renders children without attributes when disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: false }}>
        <DataTestIdRoot value="root">
          <button type="button">Save</button>
        </DataTestIdRoot>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBeNull();
  });
});
