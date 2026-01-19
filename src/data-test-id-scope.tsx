import { createContext } from "react";

/**
 * Scope value for composing data-testid values.
 *
 * Each nested DataTestId component appends to this scope to build unique IDs.
 */
export type TDataTestIdScopeValue = string | undefined;

/**
 * React context that holds the parent data-testid scope.
 *
 * The scope is undefined until a DataTestIdRoot or DataTestId creates it.
 */
export const DataTestIdScope = createContext<TDataTestIdScopeValue>(undefined);
