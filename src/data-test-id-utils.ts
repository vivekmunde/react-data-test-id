/**
 * Props for joining data-testid values.
 */
export type TJoinDataTestIdArgs = {
  values: (string | null | undefined)[];
  separator: string;
};

/**
 * Props for normalizing data-testid values.
 */
export type TNormalizeDataTestIdArgs = {
  value: string;
  spaceReplacement?: string;
  caseTransform?: "lower" | "upper";
};

/**
 * Props for replacing spaces in a value.
 */
export type TReplaceSpaceArgs = {
  value: string;
  spaceReplacement?: string;
};

/**
 * Props for converting a value to a specific case.
 */
export type TConvertCaseArgs = {
  value: string;
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
