import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: any, callback: any, delay = 500) => {
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
