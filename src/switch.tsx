import React from "react";
import { useDataTestIdConfiguration } from "./use-configuration";

/**
 * Props for the DataTestIdSwitchOn component.
 */
type TDataTestIdSwitchOnProps = {
  /**
   * Content rendered only when the configuration is enabled.
   */
  children: React.ReactNode;
};

/**
 * Props for the DataTestIdSwitchOff component.
 */
type TDataTestIdSwitchOffProps = {
  /**
   * Content rendered only when the configuration is disabled.
   */
  children: React.ReactNode;
};

/**
 * Props for the DataTestIdSwitch component.
 */
type TDataTestIdSwitchProps = {
  /**
   * Immediate children of the switch (On/Off branches).
   */
  children: React.ReactNode;
};

/**
 * Arguments for resolving switch branches.
 */
type TResolveSwitchBranchesArgs = {
  /**
   * Children provided to the switch.
   */
  children: React.ReactNode;
};

/**
 * Renders children for the On branch.
 *
 * @param children - Content rendered only when enabled.
 */
const DataTestIdSwitchOn: React.FC<TDataTestIdSwitchOnProps> = ({ children }) => {
  return children;
};

DataTestIdSwitchOn.displayName = "DataTestIdSwitch.On";

/**
 * Renders children for the Off branch.
 *
 * @param children - Content rendered only when disabled.
 */
const DataTestIdSwitchOff: React.FC<TDataTestIdSwitchOffProps> = ({ children }) => {
  return children;
};

DataTestIdSwitchOff.displayName = "DataTestIdSwitch.Off";

/**
 * Switches between On and Off branches based on configuration.
 *
 * @param children - Immediate children of the switch.
 */
const DataTestIdSwitch: React.FC<TDataTestIdSwitchProps> & {
  On: React.FC<TDataTestIdSwitchOnProps>;
  Off: React.FC<TDataTestIdSwitchOffProps>;
} = ({ children }) => {
  /**
   * Read the enabled flag from configuration.
   */
  const { enabled } = useDataTestIdConfiguration();

  let dataTestIdSwitchOnChild: React.ReactNode = null;
  let dataTestIdSwitchOffChild: React.ReactNode = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      throw new Error("DataTestIdSwitch requires valid React elements as immediate children.");
    } else if (child.type === DataTestIdSwitchOn) {
      dataTestIdSwitchOnChild = child;
    } else if (child.type === DataTestIdSwitchOff) {
      dataTestIdSwitchOffChild = child;
    } else {
      throw new Error(
        "DataTestIdSwitch only accepts DataTestIdSwitch.On and DataTestIdSwitch.Off as immediate children."
      );
    }
  });

  if (enabled) {
    return dataTestIdSwitchOnChild;
  }

  return dataTestIdSwitchOffChild;
};

DataTestIdSwitch.On = DataTestIdSwitchOn;
DataTestIdSwitch.Off = DataTestIdSwitchOff;

export { DataTestIdSwitch };
export type { TDataTestIdSwitchOffProps, TDataTestIdSwitchOnProps, TDataTestIdSwitchProps };
