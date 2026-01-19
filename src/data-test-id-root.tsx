import React, { type ReactElement, useContext } from "react";
import { DataTestIdConfiguration } from "./data-test-id-config-context";
import { DataTestIdScope } from "./data-test-id-scope";
import { normalizeDataTestIdValue } from "./data-test-id-utils";

/**
 * Props for the DataTestIdRoot component.
 */
export type TDataTestIdRootProps = {
  /**
   * Single React element that receives the data attribute.
   */
  children: React.ReactNode;
  /**
   * Root scope value used as the base for nested identifiers.
   */
  value: string;
};

/**
 * Sets the root scope value for descendant DataTestId components.
 *
 * This component normalizes the provided value using configuration and applies
 * it to the child element. It also stores the normalized value in context so
 * nested DataTestId components can compose unique identifiers.
 */
const DataTestIdRoot: React.FC<TDataTestIdRootProps> = ({ children, value, ...props }) => {
  const { enabled, dataAttributeName, spaceReplacement, caseTransform } =
    useContext(DataTestIdConfiguration);

  if (!React.isValidElement(children)) {
    console.error("DataTestId expects a valid React element as its child.");
    return null;
  }

  if (!enabled) {
    return children;
  }

  const normalizedValue = normalizeDataTestIdValue({
    value,
    spaceReplacement,
    caseTransform
  });

  const childWithDataTestId = React.cloneElement(children as ReactElement, {
    ...props,
    [dataAttributeName]: normalizedValue
  });

  return (
    <DataTestIdScope.Provider value={normalizedValue}>
      {childWithDataTestId}
    </DataTestIdScope.Provider>
  );
};

export { DataTestIdRoot };
