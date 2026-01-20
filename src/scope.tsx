import React, { useContext } from "react";
import { DataTestIdScopeContext } from "./scope-context";
import { useJoinScopes } from "./use-join-scopes";
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
   * Child nodes rendered within the derived scope.
   */
  children: React.ReactNode;
};

/**
 * Extends the current scope with a transformed segment and provides it to children.
 *
 * @param value - Scope segment to append.
 * @param children - Child nodes rendered within the derived scope.
 */
const DataTestIdScope: React.FC<TDataTestIdScopeProps> = ({ value, children }) => {
  const parentScope = useContext(DataTestIdScopeContext);
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
