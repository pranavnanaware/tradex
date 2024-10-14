import { useState, useEffect } from "react";

/**
 * Custom hook that debounces a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param {T} value - The value to debounce.
 * @param {number} delay - The delay in milliseconds to debounce the value.
 * @returns {T} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * @remarks
 * This hook is useful for delaying the execution of a function or value update
 * until after a specified delay has passed since the last time the function was invoked.
 * It is commonly used to limit the rate at which a function is executed, such as in
 * search input fields to avoid making API calls on every keystroke.
 *
 * @see {@link https://reactjs.org/docs/hooks-reference.html#usestate | useState}
 * @see {@link https://reactjs.org/docs/hooks-reference.html#useeffect | useEffect}
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
