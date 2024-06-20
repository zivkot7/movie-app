import { useEffect, useRef } from "react";

export const useDebounce = <T>(
  value: T,
  callback: (value: T) => void,
  delay = 500
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    timerRef.current = setTimeout(() => callback(value), delay);

    return () => {
      if (timerRef.current !== undefined) {
        clearTimeout(timerRef.current);
      }
    };
  }, [callback, delay, value]);
};
