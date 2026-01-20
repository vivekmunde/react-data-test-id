export { defaultConfiguration } from "./configuration";
export type { TDataTestIdConfiguration } from "./configuration";
export { DataTestIdConfigurationContext } from "./configuration-context";
export { DataTestIdConfigurationProvider } from "./configuration-provider";
export type { TDataTestIdConfigurationProviderProps } from "./configuration-provider";
export { DataTestIdRootScope } from "./root-scope";
export type { TDataTestIdRootScopeProps } from "./root-scope";
export { DataTestIdScopeContext } from "./scope-context";
export type { TDataTestIdScopeValue } from "./scope-context";
export { DataTestIdSwitch } from "./switch";
export type { TDataTestIdSwitchOffProps, TDataTestIdSwitchOnProps } from "./switch";
export {
  convertToLowerCase,
  convertToUpperCase,
  replaceSpaceWith,
  replaceWith
} from "./transformers";
export { useTransformers } from "./use-transformers";
