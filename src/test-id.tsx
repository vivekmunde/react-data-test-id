import React from "react";
import { DataTestIdAttribute } from "./attribute";
import { DataTestIdScope } from "./scope";

/**
 * Props for the DataTestId component.
 */
type TDataTestIdProps = {
  /**
   * Scope segment applied to the children when enabled.
   */
  value: string;
  /**
   * Content wrapped by the data test ID behavior.
   */
  children: React.ReactNode;
};

/**
 * Sets the scope segment in the hierarchy and applies the resulting data test ID to its child, if `enabled` in the configuration.
 *
 * @param value - Scope segment used to generate data test IDs.
 * @param children - Content wrapped by the data test ID scope.
 */
const DataTestId: React.FC<TDataTestIdProps> = ({ value, children }) => {
  return (
    <DataTestIdScope value={value}>
      <DataTestIdAttribute>{children}</DataTestIdAttribute>
    </DataTestIdScope>
  );
};

export { DataTestId };
export type { TDataTestIdProps };
