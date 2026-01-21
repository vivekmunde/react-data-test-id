import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTestIdAttribute, DataTestIdConfiguration, DataTestIdScopeContext } from "../src";

describe("DataTestIdAttribute", () => {
  it("Applies the scoped value using the default attribute name", () => {
    const { container } = render(
      <DataTestIdConfiguration>
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button">Submit</button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBe("scope-value");
  });

  it("Applies the scoped value using the configured attribute name", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ dataAttributeName: "data-x-path" }}>
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button">Submit</button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-x-path")).toBe("scope-value");
  });

  it("Preserves existing props on the child element", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <DataTestIdConfiguration>
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button" aria-label="save" onClick={handleClick}>
              Save
            </button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    fireEvent.click(button as HTMLButtonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button?.getAttribute("aria-label")).toBe("save");
    expect(button?.getAttribute("type")).toBe("button");
    expect(button?.getAttribute("data-testid")).toBe("scope-value");
  });

  it("Renders children without attributes when disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration value={{ enabled: false }}>
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button">Submit</button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfiguration>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-testid")).toBeNull();
  });

  it("Throws when the child is not a React element", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfiguration>
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>Invalid child</DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfiguration>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute expects a valid React element as its child."
    );
  });

  it("Throws when multiple children are provided", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfiguration>
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>
              <span>A</span>
              <span>B</span>
            </DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfiguration>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute expects a single React element as its child."
    );
  });

  it("Throws when a fragment is provided as the child", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfiguration>
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>
              <React.Fragment>
                <span>A</span>
              </React.Fragment>
            </DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfiguration>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute does not accept React.Fragment as its child."
    );
  });
});
