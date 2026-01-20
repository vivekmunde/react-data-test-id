import React, { type ReactElement, useContext } from "react";
import { DataTestIdConfigurationContext } from "./configuration-context";
import { DataTestIdScopeContext } from "./scope-context";

/**
 * Props for the DataTestIdAttribute component.
 */
type TDataTestIdAttributeProps = {
  /**
   * Single React element that receives the data attribute.
   */
  children: React.ReactNode;
};

/**
 * Applies the current scope value to the child using the configured attribute name.
 *
 * @param children - Child element that receives the attribute.
 */
const DataTestIdAttribute: React.FC<TDataTestIdAttributeProps> = ({ children }) => {
  const scopeValue = useContext(DataTestIdScopeContext);
  const { dataAttributeName } = useContext(DataTestIdConfigurationContext);

  if (!React.isValidElement(children)) {
    console.error("DataTestIdAttribute expects a valid React element as its child.");
    return null;
  }

  const childWithAttribute = React.cloneElement(children as ReactElement, {
    [dataAttributeName]: scopeValue
  });

  return childWithAttribute;
};

export { DataTestIdAttribute };
export type { TDataTestIdAttributeProps };
