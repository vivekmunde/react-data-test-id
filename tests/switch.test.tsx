import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext, DataTestIdSwitch } from "../src";

describe("DataTestIdSwitch", () => {
  it("Renders On when enabled by default", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdSwitch.On>
          <div>Enabled</div>
        </DataTestIdSwitch.On>
        <DataTestIdSwitch.Off>
          <div>Disabled</div>
        </DataTestIdSwitch.Off>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(container.querySelector("div")?.textContent).toBe("Enabled");
    expect(container.textContent).not.toContain("Disabled");
  });

  it("Renders Off when disabled", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: false,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdSwitch.On>
          <div>Enabled</div>
        </DataTestIdSwitch.On>
        <DataTestIdSwitch.Off>
          <div>Disabled</div>
        </DataTestIdSwitch.Off>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(container.querySelector("div")?.textContent).toBe("Disabled");
    expect(container.textContent).not.toContain("Enabled");
  });
});
