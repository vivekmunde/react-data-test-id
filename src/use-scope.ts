import { useContext } from "react";
import { DataTestIdScopeContext, TDataTestIdScopeValue } from "./scope-context";

/**
 * Returns the current data test ID scope from context.
 */
const useDataTestIdScope = (): TDataTestIdScopeValue => {
  return useContext(DataTestIdScopeContext);
};

export { useDataTestIdScope };
