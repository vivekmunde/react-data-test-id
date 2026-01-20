import { useMemo } from "react";
import { useDataTestIdConfiguration } from "./use-configuration";

/**
 * Hook that applies configured transformers to a value.
 *
 * @param value - Raw input value to transform.
 */
const useTransformers = (value: string): string => {
  const { scopeTrasnformers } = useDataTestIdConfiguration();

  const transformedValue = useMemo(() => {
    if (!scopeTrasnformers || scopeTrasnformers.length === 0) {
      return value;
    }

    return scopeTrasnformers.reduce(
      (currentValue, transformer) => transformer(currentValue),
      value
    );
  }, [scopeTrasnformers, value]);

  return transformedValue;
};

export { useTransformers };
