import { createContext } from "react";
import { defaultConfiguration, TDataTestIdConfiguration } from "./configuration";

/**
 * React context that exposes the current DataTestId configuration.
 */
const DataTestIdConfigurationContext =
  createContext<TDataTestIdConfiguration>(defaultConfiguration);

export { DataTestIdConfigurationContext };
