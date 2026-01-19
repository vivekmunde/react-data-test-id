import { createContext } from "react";

/**
 * Configuration values for data-testid generation behavior.
 */
export type TDataTestIdConfiguration = {
  dataAttributeName: string;
  enabled: boolean;
  pathSeparator: string;
  spaceReplacement?: string;
  caseTransform?: "lower" | "upper";
};

/**
 * React context for DataTestId configuration.
 */
export const DataTestIdConfiguration = createContext<TDataTestIdConfiguration>({
  enabled: true,
  pathSeparator: "-",
  dataAttributeName: "data-testid",
  spaceReplacement: "-",
  caseTransform: "lower"
});
