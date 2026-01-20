import React from "react";
import { DataTestIdAttribute } from "./attribute";
import { DataTestIdRootScope } from "./root-scope";
import { DataTestIdSwitch } from "./switch";

/**
 * Props for the DataTestIdRoot component.
 */
type TDataTestIdRootProps = {
  /**
   * Root scope value applied to the children when configured.
   */
  value: string;
  /**
   * Content wrapped by the root scope behavior.
   */
  children: React.ReactNode;
};

/**
 * Sets a root scope and applies the data test ID attribute when enabled.
 *
 * @param value - Root scope value used to generate data test IDs.
 * @param children - Content wrapped by the root scope.
 */
const DataTestIdRoot: React.FC<TDataTestIdRootProps> = ({ value, children }) => {
  return (
    <React.Fragment>
      <DataTestIdSwitch.Off>{children}</DataTestIdSwitch.Off>
      <DataTestIdSwitch.On>
        <DataTestIdRootScope value={value}>
          <DataTestIdAttribute>{children}</DataTestIdAttribute>
        </DataTestIdRootScope>
      </DataTestIdSwitch.On>
    </React.Fragment>
  );
};

export { DataTestIdRoot };
export type { TDataTestIdRootProps };
