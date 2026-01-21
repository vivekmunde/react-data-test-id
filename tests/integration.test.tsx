import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import {
  DataTestId,
  DataTestIdConfiguration,
  DataTestIdRoot,
  DataTestIdRootScope,
  DataTestIdScope,
  defaultConfiguration
} from "../src";

describe("Integration", () => {
  it("Builds scoped data test IDs from root and nested scope components", () => {
    const { container } = render(
      <DataTestIdConfiguration value={defaultConfiguration}>
        <DataTestIdRoot value="app">
          <div>
            <DataTestIdScope value="form">
              <DataTestId value="submit">
                <button type="button">Submit</button>
              </DataTestId>
            </DataTestIdScope>
          </div>
        </DataTestIdRoot>
      </DataTestIdConfiguration>
    );

    const root = container.querySelector("div");
    const button = container.querySelector("button");
    expect(root?.getAttribute("data-testid")).toBe("app");
    expect(button?.getAttribute("data-testid")).toBe("app-form-submit");
  });

  it("Builds deep scoped ids across multiple nested scopes", () => {
    const { container } = render(
      <DataTestIdConfiguration value={defaultConfiguration}>
        <DataTestIdRoot value="app">
          <section>
            <DataTestIdScope value="settings">
              <DataTestIdScope value="profile">
                <DataTestId value="save">
                  <button type="button">Save</button>
                </DataTestId>
              </DataTestIdScope>
            </DataTestIdScope>
          </section>
        </DataTestIdRoot>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("app-settings-profile-save");
  });

  it("Resets scope when a nested root scope is applied", () => {
    const { container } = render(
      <DataTestIdConfiguration value={defaultConfiguration}>
        <DataTestIdRoot value="app">
          <div>
            <DataTestIdRootScope value="modal">
              <DataTestId value="close">
                <button type="button">Close</button>
              </DataTestId>
            </DataTestIdRootScope>
          </div>
        </DataTestIdRoot>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("modal-close");
  });
});
