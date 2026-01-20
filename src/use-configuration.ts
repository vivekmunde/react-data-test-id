import { useContext } from "react";
import { TDataTestIdConfiguration } from "./configuration";
import { DataTestIdConfigurationContext } from "./configuration-context";

/**
 * Returns the current data test ID configuration from context.
 */
const useDataTestIdConfiguration = (): TDataTestIdConfiguration => {
  return useContext(DataTestIdConfigurationContext);
};

export { useDataTestIdConfiguration };
