import React, { useMemo } from "react";
import { defaultConfiguration, TDataTestIdConfiguration } from "./configuration";
import { DataTestIdConfigurationContext } from "./configuration-context";

/**
 * Props for the DataTestIdConfiguration component.
 */
type TDataTestIdConfigurationProps = {
  /**
   * Partial configuration merged with defaults.
   */
  value?: Partial<TDataTestIdConfiguration>;
  /**
   * Child nodes that consume the configuration context.
   */
  children: React.ReactNode;
};

/**
 * Provides DataTestId configuration by merging defaults with the supplied partial value.
 *
 * @param value - Partial configuration overrides applied on top of defaults.
 * @param children - Child nodes that consume the configuration context.
 */
const DataTestIdConfiguration: React.FC<TDataTestIdConfigurationProps> = ({ value, children }) => {
  /**
   * Merge the default configuration with the provided partial overrides.
   */
  const mergedValue = useMemo(
    () => ({
      ...defaultConfiguration,
      ...value
    }),
    [value?.dataAttributeName, value?.enabled, value?.scopeSeparator, value?.scopeTransformers]
  );

  return (
    <DataTestIdConfigurationContext.Provider value={mergedValue}>
      {children}
    </DataTestIdConfigurationContext.Provider>
  );
};

export { DataTestIdConfiguration };
export type { TDataTestIdConfigurationProps };
