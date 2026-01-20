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

  it("Returns null and logs when the child is not a React element", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
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
          <DataTestIdAttribute>Invalid child</DataTestIdAttribute>
        </DataTestIdScopeContext.Provider>
      </DataTestIdConfigurationContext.Provider>
    );

    expect(container.firstChild).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith(
      "DataTestIdAttribute expects a valid React element as its child."
    );

    errorSpy.mockRestore();
  });
});
