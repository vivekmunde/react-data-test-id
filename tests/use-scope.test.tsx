import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { DataTestIdScopeContext, useDataTestIdScope } from "../src";

describe("useDataTestIdScope", () => {
  it("Returns the default scope value when no provider is used", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useDataTestIdScope());
      return null;
    };

    render(<CaptureScope />);

    expect(values[0]).toBe("");
  });

  it("Returns the provided scope value from context", () => {
    const values: Array<string> = [];

    const CaptureScope = () => {
      values.push(useDataTestIdScope());
      return null;
    };

    render(
      <DataTestIdScopeContext.Provider value="profile">
        <CaptureScope />
      </DataTestIdScopeContext.Provider>
    );

    expect(values[0]).toBe("profile");
  });
});
