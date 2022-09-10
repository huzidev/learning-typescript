import { useEffect, useRef } from 'react';

// eslint-disable-next-line
export function usePrevious<K>(value: K): K | null {
  const ref = useRef<K>();
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  return ref.current as K;
}
