import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { DataTestId, DataTestIdConfiguration, DataTestIdRoot } from "../src";

describe("DataTestId components", () => {
  it("Adds data-testid to a direct child with sanitized value", () => {
    render(
      <DataTestId value="Submit Button!">
        <button type="button">Submit</button>
      </DataTestId>
    );

    expect(screen.getByTestId("submit-button!")).toBeTruthy();
  });

  it("Joins parent and child ids with a separator", () => {
    render(
      <DataTestIdRoot value="root">
        <DataTestId value="Child Value!">
          <div>Child</div>
        </DataTestId>
      </DataTestIdRoot>
    );

    expect(screen.getByTestId("root-child-value!")).toBeTruthy();
  });

  it("Respects spaceReplacement configuration", () => {
    render(
      <DataTestIdConfiguration.Provider
        value={{
          enabled: true,
          pathSeparator: "-",
          dataAttributeName: "data-testid",
          spaceReplacement: "_",
          caseTransform: undefined
        }}
      >
        <DataTestId value="Child Value!">
          <div>Child</div>
        </DataTestId>
      </DataTestIdConfiguration.Provider>
    );

    expect(screen.getByTestId("Child_Value!")).toBeTruthy();
  });

  it("Respects caseTransform configuration", () => {
    render(
      <DataTestIdConfiguration.Provider
        value={{
          enabled: true,
          pathSeparator: "-",
          dataAttributeName: "data-testid",
          spaceReplacement: "-",
          caseTransform: "upper"
        }}
      >
        <DataTestId value="Child Value!">
          <div>Child</div>
        </DataTestId>
      </DataTestIdConfiguration.Provider>
    );

    expect(screen.getByTestId("CHILD-VALUE!")).toBeTruthy();
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
        <DataTestId value="Child Value!">
          <div>Child</div>
        </DataTestId>
      </DataTestIdConfiguration.Provider>
    );

    const element = container.querySelector("[data-testid]");
    expect(element).toBeNull();
  });

  it("Returns null and logs when child is not a React element", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const { container } = render(<DataTestId value="value">Invalid child</DataTestId>);

    expect(container.firstChild).toBeNull();
    expect(errorSpy).toHaveBeenCalledWith("DataTestId expects a valid React element as its child.");

    errorSpy.mockRestore();
  });
});
