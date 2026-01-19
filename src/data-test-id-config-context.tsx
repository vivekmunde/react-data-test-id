import { createContext } from "react";

/**
 * Configuration values for data-testid generation behavior.
 *
 * These settings control how values are normalized, how segments are joined,
 * and which data attribute name is written on elements.
 */
export type TDataTestIdConfiguration = {
  /**
   * Name of the data attribute to apply to elements.
   */
  dataAttributeName: string;
  /**
   * When false, data attributes are not applied.
   */
  enabled: boolean;
  /**
   * Separator used to join scoped segments.
   */
  pathSeparator: string;
  /**
   * Optional replacement value for whitespace.
   */
  spaceReplacement?: string;
  /**
   * Optional case transform applied after spacing rules.
   */
  caseTransform?: "lower" | "upper";
};

/**
 * React context for DataTestId configuration.
 *
 * Defaults provide dash-separated, lowercase identifiers written to data-testid.
 */
export const DataTestIdConfiguration = createContext<TDataTestIdConfiguration>({
  enabled: true,
  pathSeparator: "-",
  dataAttributeName: "data-testid",
  spaceReplacement: "-",
  caseTransform: "lower"
});
