import React from "react";
import { DataTestIdScopeContext } from "./scope-context";
import { useTransformers } from "./use-transformers";

/**
 * Props for the DataTestIdRootScope component.
 */
type TDataTestIdRootScopeProps = {
  /**
   * Root scope value before transformers are applied.
   */
  value: string;
  /**
   * Children to be rendered.
   */
  children: React.ReactNode;
};

/**
 * Provides a root scope value that is transformed by configured transformers.
 *
 * @param value - Root scope value before transformations.
 * @param children - Children to be rendered.
 */
const DataTestIdRootScope: React.FC<TDataTestIdRootScopeProps> = ({ value, children }) => {
  const currentScope = useTransformers(value);

  return (
    <DataTestIdScopeContext.Provider value={currentScope}>
      {children}
    </DataTestIdScopeContext.Provider>
  );
};

export { DataTestIdRootScope };
export type { TDataTestIdRootScopeProps };
