import { useContext, useMemo } from "react";
import { DataTestIdConfigurationContext } from "./configuration-context";

/**
 * Joins scope segments with the provided separator.
 *
 * @param segments - Ordered scope segments to join.
 */
const useJoinScopes = (segments: Array<string>): string => {
  const { scopeSeparator } = useContext(DataTestIdConfigurationContext);
  const joinedScope = useMemo(
    () => segments.filter(Boolean).join(scopeSeparator),
    [segments, scopeSeparator]
  );

  return joinedScope;
};

export { useJoinScopes };
