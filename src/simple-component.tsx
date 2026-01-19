import React from "react";

export interface SimpleComponentProps {
  label?: string;
}

export function SimpleComponent({ label = "Hello" }: SimpleComponentProps) {
  return <div data-test-id="simple-component">{label}</div>;
}
