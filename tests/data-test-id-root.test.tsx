import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTestIdConfiguration, DataTestIdRoot } from "../src";

describe("DataTestIdRoot", () => {
  it("Adds data-testid to a direct child", () => {
    const { container } = render(
      <DataTestIdRoot value="root-id">
        <div>Root</div>
      </DataTestIdRoot>
    );

    const element = container.querySelector('[data-testid="root-id"]');
    expect(element).not.toBeNull();
  });

  it("Respects spaceReplacement configuration", () => {
    const { container } = render(
      <DataTestIdConfiguration.Provider
        value={{
          enabled: true,
          pathSeparator: "-",
          dataAttributeName: "data-testid",
          spaceReplacement: "_",
          caseTransform: undefined
        }}
      >
        <DataTestIdRoot value="Root Value">
          <div>Root</div>
        </DataTestIdRoot>
      </DataTestIdConfiguration.Provider>
    );

    const element = container.querySelector('[data-testid="Root_Value"]');
    expect(element).not.toBeNull();
  });

  it("Respects caseTransform configuration", () => {
    const { container } = render(
      <DataTestIdConfiguration.Provider
        value={{
          enabled: true,
          pathSeparator: "-",
          dataAttributeName: "data-testid",
          spaceReplacement: "-",
          caseTransform: "upper"
        }}
      >
        <DataTestIdRoot value="Root Value">
          <div>Root</div>
        </DataTestIdRoot>
      </DataTestIdConfiguration.Provider>
    );

    const element = container.querySelector('[data-testid="ROOT-VALUE"]');
    expect(element).not.toBeNull();
  });

  it("Does not add data-testid when disabled", () => {
    const { container } = render(
      <DataTestIdConfiguration.Provider
        value={{
          enabled: false,
          pathSeparator: "-",
          dataAttributeName: "data-testid",
          spaceReplacement: "-",
          caseTransform: "lower"
        }}
      >
        <DataTestIdRoot value="Root Value">
          <div>Root</div>
        </DataTestIdRoot>
      </DataTestIdConfiguration.Provider>
    );

    const element = container.querySelector("[data-testid]");
    expect(element).toBeNull();
  });

  it("Returns null and logs when child is not a React element", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { container } = render(<DataTestIdRoot value="root-id">Invalid child</DataTestIdRoot>);

    expect(container.firstChild).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith("DataTestId expects a valid React element as its child.");

    errorSpy.mockRestore();
  });
});
