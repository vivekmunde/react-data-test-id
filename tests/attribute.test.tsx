import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import {
  DataTestIdAttribute,
  DataTestIdConfigurationContext,
  DataTestIdScopeContext
} from "../src";

describe("DataTestIdAttribute", () => {
  it("Applies the scoped value using the configured attribute name", () => {
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-x-path",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button">Submit</button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    expect(button?.getAttribute("data-x-path")).toBe("scope-value");
  });

  it("Preserves existing props on the child element", () => {
    const handleClick = vi.fn();
    const { container } = render(
      <DataTestIdConfigurationContext.Provider
        value={{
          enabled: true,
          dataAttributeName: "data-testid",
          scopeSeparator: "-",
          scopeTrasnformers: []
        }}
      >
        <DataTestIdScopeContext.Provider value="scope-value">
          <DataTestIdAttribute>
            <button type="button" aria-label="save" onClick={handleClick}>
              Save
            </button>
          </DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    const button = container.querySelector("button");
    fireEvent.click(button as HTMLButtonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(button?.getAttribute("aria-label")).toBe("save");
    expect(button?.getAttribute("type")).toBe("button");
    expect(button?.getAttribute("data-testid")).toBe("scope-value");
  });

  it("Throws when the child is not a React element", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfigurationContext.Provider
          value={{
            enabled: true,
            dataAttributeName: "data-testid",
            scopeSeparator: "-",
            scopeTrasnformers: []
          }}
        >
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>Invalid child</DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfigurationContext.Provider>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute expects a valid React element as its child."
    );
  });

  it("Throws when multiple children are provided", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfigurationContext.Provider
          value={{
            enabled: true,
            dataAttributeName: "data-testid",
            scopeSeparator: "-",
            scopeTrasnformers: []
          }}
        >
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>
              <span>A</span>
              <span>B</span>
            </DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfigurationContext.Provider>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute expects a single React element as its child."
    );
  });

  it("Throws when a fragment is provided as the child", () => {
    const renderInvalid = () =>
      render(
        <DataTestIdConfigurationContext.Provider
          value={{
            enabled: true,
            dataAttributeName: "data-testid",
            scopeSeparator: "-",
            scopeTrasnformers: []
          }}
        >
          <DataTestIdScopeContext.Provider value="scope-value">
            <DataTestIdAttribute>
              <React.Fragment>
                <span>A</span>
              </React.Fragment>
            </DataTestIdAttribute>
          </DataTestIdScopeContext.Provider>
        </DataTestIdConfigurationContext.Provider>
      );

    expect(renderInvalid).toThrowError(
      "DataTestIdAttribute does not accept React.Fragment as its child."
    );
  });
});
