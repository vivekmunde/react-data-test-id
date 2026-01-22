import { useMemo } from "react";
import { useDataTestIdConfiguration } from "./use-configuration";

/**
 * Hook that applies configured transformers to a value.
 *
 * @param value - Raw input value to transform.
 */
const useTransformers = (value: string): string => {
  const { scopeTransformers } = useDataTestIdConfiguration();

  const transformedValue = useMemo(() => {
    if (!scopeTransformers || scopeTransformers.length === 0) {
      return value;
    }

    return scopeTransformers.reduce(
      (currentValue, transformer) => transformer(currentValue),
      value
    );
  }, [scopeTransformers, value]);

  return transformedValue;
};

export { useTransformers };
