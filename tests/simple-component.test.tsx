import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SimpleComponent } from "../src/simple-component";

describe("SimpleComponent", () => {
  it("renders label and data-test-id", () => {
    render(<SimpleComponent label="Hello Test" />);

    const element = screen.getByText("Hello Test");
    expect(element.getAttribute("data-test-id")).toBe("simple-component");
  });
});
