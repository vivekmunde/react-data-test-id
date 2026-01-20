import React, { useMemo } from "react";
import { defaultConfiguration, TDataTestIdConfiguration } from "./configuration";
import { DataTestIdConfigurationContext } from "./configuration-context";

/**
 * Props for the DataTestIdConfigurationProvider component.
 */
type TDataTestIdConfigurationProviderProps = {
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
const DataTestIdConfigurationProvider: React.FC<TDataTestIdConfigurationProviderProps> = ({
  value,
  children
}) => {
  /**
   * Merge the default configuration with the provided partial overrides.
   */
  const mergedValue = useMemo(
    () => ({
      ...defaultConfiguration,
      ...value
    }),
    [value?.dataAttributeName, value?.enabled, value?.scopeSeparator, value?.scopeTrasnformers]
  );

  return (
    <DataTestIdConfigurationContext.Provider value={mergedValue}>
      {children}
    </DataTestIdConfigurationContext.Provider>
  );
};

export { DataTestIdConfigurationProvider };
export type { TDataTestIdConfigurationProviderProps };
