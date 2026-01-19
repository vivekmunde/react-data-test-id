import React, { type ReactElement, useContext, useMemo } from "react";
import { DataTestIdConfiguration } from "./data-test-id-config-context";
import { DataTestIdScope } from "./data-test-id-scope";
import { joinDataTestIds, normalizeDataTestIdValue } from "./data-test-id-utils";

/**
 * Props for the DataTestId component.
 */
export type TDataTestIdProps = {
  /**
   * Single React element that receives the data attribute.
   */
  children: React.ReactNode;
  /**
   * Segment to append to the current scope before normalization.
   */
  value: string;
};

/**
 * Adds a data attribute to its child and composes it with any parent scope value.
 *
 * This component uses the current DataTestIdScope to build a unique identifier
 * and applies it to the child element using the configured data attribute name.
 * When the configuration is disabled, it returns the child unchanged.
 */
const DataTestId: React.FC<TDataTestIdProps> = ({ children, value, ...props }) => {
  const parentValue = useContext(DataTestIdScope);
  const { enabled, pathSeparator, dataAttributeName, spaceReplacement, caseTransform } =
    useContext(DataTestIdConfiguration);

  if (!React.isValidElement(children)) {
    console.error("DataTestId expects a valid React element as its child.");
    return null;
  }

  if (!enabled) {
    return children;
  }

  const contextValue = useMemo(
    () =>
      joinDataTestIds({
        values: [
          parentValue,
          normalizeDataTestIdValue({
            value,
            spaceReplacement,
            caseTransform
          })
        ],
        separator: pathSeparator
      }),
    [parentValue, pathSeparator, value, spaceReplacement, caseTransform]
  );

  const childWithDataTestId = React.cloneElement(children as ReactElement, {
    ...props,
    [dataAttributeName]: contextValue
  });

  return (
    <DataTestIdScope.Provider value={contextValue}>{childWithDataTestId}</DataTestIdScope.Provider>
  );
};

export { DataTestId };
