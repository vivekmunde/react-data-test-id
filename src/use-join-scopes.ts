import { useMemo } from "react";
import { useDataTestIdConfiguration } from "./use-configuration";

/**
 * Joins scope segments with the provided separator.
 *
 * @param segments - Ordered scope segments to join.
 */
const useJoinScopes = (segments: Array<string>): string => {
  const { scopeSeparator } = useDataTestIdConfiguration();
  const joinedScope = useMemo(
    () => segments.filter(Boolean).join(scopeSeparator),
    [segments, scopeSeparator]
  );

  return joinedScope;
};

export { useJoinScopes };
