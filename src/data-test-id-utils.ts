/**
 * Props for joining data-testid values.
 */
export type TJoinDataTestIdArgs = {
  /**
   * Ordered list of scope segments to join.
   */
  values: (string | null | undefined)[];
  /**
   * Separator string placed between segments.
   */
  separator: string;
};

/**
 * Props for normalizing data-testid values.
 */
export type TNormalizeDataTestIdArgs = {
  /**
   * Raw segment value to normalize.
   */
  value: string;
  /**
   * Optional replacement for whitespace characters.
   */
  spaceReplacement?: string;
  /**
   * Optional case transform applied after spacing rules.
   */
  caseTransform?: "lower" | "upper";
};

/**
 * Props for replacing spaces in a value.
 */
export type TReplaceSpaceArgs = {
  /**
   * Raw value that may contain whitespace.
   */
  value: string;
  /**
   * Replacement string for each whitespace character.
   */
  spaceReplacement?: string;
};

/**
 * Props for converting a value to a specific case.
 */
export type TConvertCaseArgs = {
  /**
   * Value to convert to the requested case.
   */
  value: string;
  /**
   * Optional target case for conversion.
   */
  caseTransform?: "lower" | "upper";
};

/**
 * Joins data-testid values using the configured separator.
 */
export const joinDataTestIds = ({ values, separator }: TJoinDataTestIdArgs): string => {
  return values.filter(Boolean).join(separator);
};

/**
 * Replaces spaces in a value based on configuration.
 */
export const replaceSpace = ({ value, spaceReplacement }: TReplaceSpaceArgs): string => {
  return spaceReplacement ? value.replace(/\s/gi, spaceReplacement) : value;
};

/**
 * Converts a value to the configured case.
 */
export const convertCase = ({ value, caseTransform }: TConvertCaseArgs): string => {
  if (caseTransform === "lower") {
    return value.toLowerCase();
  }

  if (caseTransform === "upper") {
    return value.toUpperCase();
  }

  return value;
};

/**
 * Normalizes a data-testid value based on configuration.
 */
export const normalizeDataTestIdValue = ({
  value,
  spaceReplacement,
  caseTransform
}: TNormalizeDataTestIdArgs): string => {
  const replacedValue = replaceSpace({ value, spaceReplacement });
  return convertCase({ value: replacedValue, caseTransform });
};
