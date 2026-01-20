import { createContext } from "react";

/**
 * Context value representing the current data test ID scope.
 */
type TDataTestIdScopeValue = string;

/**
 * React context that holds the current scope value.
 */
const DataTestIdScopeContext = createContext<TDataTestIdScopeValue>("");

export { DataTestIdScopeContext };
export type { TDataTestIdScopeValue };
