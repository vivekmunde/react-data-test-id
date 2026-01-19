import React, { type ReactElement, useContext, useMemo } from "react";
import { DataTestIdConfiguration } from "./data-test-id-config-context";
import { DataTestIdScope } from "./data-test-id-scope";
import { joinDataTestIds, normalizeDataTestIdValue } from "./data-test-id-utils";

/**
 * Props for the DataTestId component.
 */
export type TDataTestIdProps = {
  children: React.ReactNode;
  value: string;
};

/**
 * Adds a data-testid to its child and composes it with any parent value.
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
