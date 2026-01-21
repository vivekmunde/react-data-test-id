import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdConfiguration, DataTestIdSwitch } from "../src";

describe("DataTestIdSwitch", () => {
  it("Renders On when enabled by default", () => {
    const { container } = render(
      <DataTestIdConfiguration>
        <DataTestIdSwitch>
          <DataTestIdSwitch.On>
            <div>Enabled</div>
          </DataTestIdSwitch.On>
          <DataTestIdSwitch.Off>
            <div>Disabled</div>
          </DataTestIdSwitch.Off>
        </DataTestIdSwitch>
      </DataTestIdConfiguration>
    );

    expect(container.querySelector("div")?.textContent).toBe("Enabled");
    expect(container.textContent).not.toContain("Disabled");
  });

  it("Renders nothing when only Off is provided and enabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: true }}>
        <DataTestIdSwitch>
          <DataTestIdSwitch.Off>
            <div>Disabled</div>
          </DataTestIdSwitch.Off>
        </DataTestIdSwitch>
      </DataTestIdConfiguration>
    );

    expect(container.firstChild).toBeNull();
  });

  it("Renders Off when disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: false }}>
        <DataTestIdSwitch>
          <DataTestIdSwitch.On>
            <div>Enabled</div>
          </DataTestIdSwitch.On>
          <DataTestIdSwitch.Off>
            <div>Disabled</div>
          </DataTestIdSwitch.Off>
        </DataTestIdSwitch>
      </DataTestIdConfiguration>
    );

    expect(container.querySelector("div")?.textContent).toBe("Disabled");
    expect(container.textContent).not.toContain("Enabled");
  });

  it("Renders nothing when only On is provided and disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: false }}>
        <DataTestIdSwitch>
          <DataTestIdSwitch.On>
            <div>Enabled</div>
          </DataTestIdSwitch.On>
        </DataTestIdSwitch>
      </DataTestIdConfiguration>
    );

    expect(container.firstChild).toBeNull();
  });

  it("Throws when a non-element child is provided", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfiguration>
          <DataTestIdSwitch>
            {"invalid"}
            <DataTestIdSwitch.On>
              <div>Enabled</div>
            </DataTestIdSwitch.On>
          </DataTestIdSwitch>
        </DataTestIdConfiguration>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdSwitch requires valid React elements as immediate children."
    );
  });

  it("Throws when a non-branch element is provided", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfiguration>
          <DataTestIdSwitch>
            <div>Invalid</div>
            <DataTestIdSwitch.On>
              <div>Enabled</div>
            </DataTestIdSwitch.On>
          </DataTestIdSwitch>
        </DataTestIdConfiguration>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdSwitch only accepts DataTestIdSwitch.On and DataTestIdSwitch.Off as immediate children."
    );
  });

  it("Renders content when On is rendered directly", () => {
    const { container } = render(
      <DataTestIdSwitch.On>
        <div>Enabled</div>
      </DataTestIdSwitch.On>
    );

    expect(container.querySelector("div")?.textContent).toBe("Enabled");
  });

  it("Renders content when Off is rendered directly", () => {
    const { container } = render(
      <DataTestIdSwitch.Off>
        <div>Disabled</div>
      </DataTestIdSwitch.Off>
    );

    expect(container.querySelector("div")?.textContent).toBe("Disabled");
  });
});
