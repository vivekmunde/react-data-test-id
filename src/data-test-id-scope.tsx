import { createContext } from "react";

/**
 * Scope value for composing data-testid values.
 */
export type TDataTestIdScopeValue = string | undefined;

/**
 * React context that holds the parent data-testid scope.
 */
export const DataTestIdScope = createContext<TDataTestIdScopeValue>(undefined);
