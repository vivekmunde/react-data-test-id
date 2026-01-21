import React, { type ReactElement } from "react";
import { DataTestIdSwitch } from "./switch";
import { useDataTestIdConfiguration } from "./use-configuration";
import { useDataTestIdScope } from "./use-scope";

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
 * Arguments for the useIsValidNode hook.
 */
type TUseIsValidNodeArgs = {
  /**
   * Child content to validate.
   */
  children: React.ReactNode;
};

/**
 * Arguments for the useIsSingleNode hook.
 */
type TUseIsSingleNodeArgs = {
  /**
   * Child content to validate.
   */
  children: React.ReactNode;
};

/**
 * Arguments for the useIsNotFragment hook.
 */
type TUseIsNotFragmentArgs = {
  /**
   * Child content to validate.
   */
  children: React.ReactNode;
};

/**
 * Arguments for the useIsValidChild hook.
 */
type TUseIsValidChildArgs = {
  /**
   * Child content to validate.
   */
  children: React.ReactNode;
};

/**
 * Ensures the child is a valid React element.
 *
 * @param children - Child content to validate.
 */
const useIsValidNode = ({ children }: TUseIsValidNodeArgs): void => {
  if (!React.isValidElement(children)) {
    throw new Error("DataTestIdAttribute expects a valid React element as its child.");
  }
};

/**
 * Ensures only a single child is provided.
 *
 * @param children - Child content to validate.
 */
const useIsSingleNode = ({ children }: TUseIsSingleNodeArgs): void => {
  if (Array.isArray(children)) {
    throw new Error("DataTestIdAttribute expects a single React element as its child.");
  }
};

/**
 * Blocks React.Fragment as a valid child element.
 *
 * @param children - Child content to validate.
 */
const useIsNotFragment = ({ children }: TUseIsNotFragmentArgs): void => {
  if (React.isValidElement(children) && children.type === React.Fragment) {
    throw new Error("DataTestIdAttribute does not accept React.Fragment as its child.");
  }
};

/**
 * Ensures the child passes all DataTestIdAttribute validation rules.
 *
 * @param children - Child content to validate.
 */
const useIsValidChild = ({ children }: TUseIsValidChildArgs): void => {
  useIsSingleNode({ children });
  useIsNotFragment({ children });
  useIsValidNode({ children });
};

/**
 * Applies the data test ID attribute to the validated child element.
 *
 * @param children - Child element to decorate.
 */
const DataTestIdAttributeSetter: React.FC<TDataTestIdAttributeProps> = ({ children }) => {
  const scopeValue = useDataTestIdScope();
  const { dataAttributeName } = useDataTestIdConfiguration();
  const childWithAttribute = React.cloneElement(children as ReactElement, {
    [dataAttributeName]: scopeValue
  });

  return childWithAttribute;
};

/**
 * Applies the current scope value as a data test ID attribute, if `enabled` in configuration.
 * The attribute value is read from the active scope in the hierarchy.
 *
 * @param children - Child element that receives the attribute.
 */
const DataTestIdAttribute: React.FC<TDataTestIdAttributeProps> = ({ children }) => {
  useIsValidChild({ children });

  return (
    <DataTestIdSwitch>
      <DataTestIdSwitch.Off>{children}</DataTestIdSwitch.Off>
      <DataTestIdSwitch.On>
        <DataTestIdAttributeSetter>{children}</DataTestIdAttributeSetter>
      </DataTestIdSwitch.On>
    </DataTestIdSwitch>
  );
};

export { DataTestIdAttribute };
export type { TDataTestIdAttributeProps };
