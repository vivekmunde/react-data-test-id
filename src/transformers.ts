/**
 * Converts a value to lower case.
 *
 * @param value - Input string to convert.
 */
const convertToLowerCase = (value: string) => value.toLowerCase();

/**
 * Converts a value to upper case.
 *
 * @param value - Input string to convert.
 */
const convertToUpperCase = (value: string) => value.toUpperCase();

/**
 * Creates a transformer that replaces whitespace with the provided value.
 *
 * @param replaceValue - Replacement value applied to whitespace characters.
 */
const replaceSpaceWith = (replaceValue: string) => (value: string) =>
  value.replace(/\s/gi, replaceValue);

/**
 * Creates a transformer that replaces matches for the given RegExp.
 *
 * @param searchValue - Pattern used to find matches.
 * @param replaceValue - Replacement value for each match.
 */
const replaceWith = (searchValue: RegExp, replaceValue: string) => (value: string) =>
  value.replace(searchValue, replaceValue);

export { convertToLowerCase, convertToUpperCase, replaceSpaceWith, replaceWith };
