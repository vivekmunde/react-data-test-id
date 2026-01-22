import React from "react";
import { DataTestIdScopeContext } from "./scope-context";
import { useJoinScopes } from "./use-join-scopes";
import { useDataTestIdScope } from "./use-scope";
import { useTransformers } from "./use-transformers";

/**
 * Props for the DataTestIdScope component.
 */
type TDataTestIdScopeProps = {
  /**
   * Scope segment to append to the current scope.
   */
  value: string;
  /**
   * Children to be rendered.
   */
  children: React.ReactNode;
};

/**
 * Adds a scope segment in the hierarchy without applying an attribute, useful for layout boundaries.
 *
 * @param value - Scope segment to add in the hierarchy.
 * @param children - Children to be rendered.
 */
const DataTestIdScope: React.FC<TDataTestIdScopeProps> = ({ value, children }) => {
  const parentScope = useDataTestIdScope();
  const transformedScope = useTransformers(value);
  const currentScope = useJoinScopes([parentScope, transformedScope]);

  return (
    <DataTestIdScopeContext.Provider value={currentScope}>
      {children}
    </DataTestIdScopeContext.Provider>
  );
};

export { DataTestIdScope };
export type { TDataTestIdScopeProps };
