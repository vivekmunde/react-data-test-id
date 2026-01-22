import React from "react";
import { DataTestIdAttribute } from "./attribute";
import { DataTestIdRootScope } from "./root-scope";

/**
 * Props for the DataTestIdRoot component.
 */
type TDataTestIdRootProps = {
  /**
   * Root scope value applied to the children when configured.
   */
  value: string;
  /**
   * Children to be rendered.
   */
  children: React.ReactNode;
};

/**
 * Starts or resets the root scope in the hierarchy and applies the scope as data test ID attribute to its child, if `enabled` in configuration.
 *
 * @param value - Root scope value used to generate data test IDs.
 * @param children - Children to be rendered.
 */
const DataTestIdRoot: React.FC<TDataTestIdRootProps> = ({ value, children }) => {
  return (
    <DataTestIdRootScope value={value}>
      <DataTestIdAttribute>{children}</DataTestIdAttribute>
    </DataTestIdRootScope>
  );
};

export { DataTestIdRoot };
export type { TDataTestIdRootProps };
