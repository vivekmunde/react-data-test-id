import React from "react";
import { DataTestIdAttribute } from "./attribute";
import { DataTestIdScope } from "./scope";
import { DataTestIdSwitch } from "./switch";

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
 * Applies a scoped data test ID to children when enabled.
 *
 * @param value - Scope segment used to generate data test IDs.
 * @param children - Content wrapped by the data test ID scope.
 */
const DataTestId: React.FC<TDataTestIdProps> = ({ value, children }) => {
  return (
    <React.Fragment>
      <DataTestIdSwitch.Off>{children}</DataTestIdSwitch.Off>
      <DataTestIdSwitch.On>
        <DataTestIdScope value={value}>
          <DataTestIdAttribute>{children}</DataTestIdAttribute>
        </DataTestIdScope>
      </DataTestIdSwitch.On>
    </React.Fragment>
  );
};

export { DataTestId };
export type { TDataTestIdProps };
