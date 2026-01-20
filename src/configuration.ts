/**
 * Describes the configuration used to generate scoped data test IDs.
 */
type TDataTestIdConfiguration = {
  /**
   * Enables or disables data test ID output.
   */
  enabled: boolean;
  /**
   * Attribute name applied to elements (e.g., data-testid).
   */
  dataAttributeName: string;
  /**
   * Separator used between scope segments.
   */
  scopeSeparator: string;
  /**
   * Optional list of transformers applied to each segment.
   */
  scopeTrasnformers?: ((value: string) => string)[];
};

/**
 * Default configuration values for data test ID generation.
 */
const defaultConfiguration: TDataTestIdConfiguration = {
  enabled: true,
  dataAttributeName: "data-testid",
  scopeSeparator: "-",
  scopeTrasnformers: []
};

export { defaultConfiguration };
export type { TDataTestIdConfiguration };
