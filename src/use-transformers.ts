import { useContext, useMemo } from "react";
import { DataTestIdConfigurationContext } from "./configuration-context";

/**
 * Hook that applies configured transformers to a value.
 *
 * @param value - Raw input value to transform.
 */
const useTransformers = (value: string): string => {
  const { scopeTrasnformers } = useContext(DataTestIdConfigurationContext);

  const transformedValue = useMemo(() => {
    if (!scopeTrasnformers || scopeTrasnformers.length === 0) {
      return value;
    }

    return scopeTrasnformers.reduce(
      (currentValue, transformer) => transformer(currentValue),
      value
    );
  }, [value]);

  return transformedValue;
};

export { useTransformers };
