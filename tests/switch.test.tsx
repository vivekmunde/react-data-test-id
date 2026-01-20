import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfigurationContext } from "../src/configuration-context";
import { DataTestIdSwitch } from "../src/switch";

describe("DataTestIdSwitch", () => {
  it("Renders On when enabled", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          scopeSeparator: "-",
          dataAttributeName: "data-testid"
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
          scopeSeparator: "-",
          dataAttributeName: "data-testid"
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
