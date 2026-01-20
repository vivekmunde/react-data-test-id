import React, { useContext } from "react";
import { DataTestIdConfigurationContext } from "./configuration-context";

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
 * Renders children only when DataTestIdConfiguration is enabled.
 *
 * @param children - Content rendered only when enabled.
 */
const DataTestIdSwitchOn: React.FC<TDataTestIdSwitchOnProps> = ({ children }) => {
  /**
   * Read the enabled flag from configuration.
   */
  const { enabled } = useContext(DataTestIdConfigurationContext);

  if (enabled) {
    return children;
  }

  return null;
};

/**
 * Renders children only when DataTestIdConfiguration is disabled.
 *
 * @param children - Content rendered only when disabled.
 */
const DataTestIdSwitchOff: React.FC<TDataTestIdSwitchOffProps> = ({ children }) => {
  /**
   * Read the enabled flag from configuration.
   */
  const { enabled } = useContext(DataTestIdConfigurationContext);

  if (enabled) {
    return null;
  }

  return children;
};

/**
 * Provides On/Off render branches based on the configuration.
 */
const DataTestIdSwitch = {
  On: DataTestIdSwitchOn,
  Off: DataTestIdSwitchOff
};

export { DataTestIdSwitch };
export type { TDataTestIdSwitchOffProps, TDataTestIdSwitchOnProps };
