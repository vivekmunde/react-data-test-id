import React, { type ReactElement, useContext } from "react";
import { DataTestIdConfiguration } from "./data-test-id-config-context";
import { DataTestIdScope } from "./data-test-id-scope";
import { normalizeDataTestIdValue } from "./data-test-id-utils";

/**
 * Props for the DataTestIdRoot component.
 */
export type TDataTestIdRootProps = {
  children: React.ReactNode;
  value: string;
};

/**
 * Sets the root data-testid value for descendant DataTestId components.
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
