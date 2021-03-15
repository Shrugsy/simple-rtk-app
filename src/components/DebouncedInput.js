import { useCallback, useEffect, useRef, useState } from "react";

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}


function DebouncedInput({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue);
  const onChangeRef = useRef(onChange);

  const callOnChange = useCallback((value) => {
    onChangeRef.current(value);
  }, []);

  // update local value again if we receive it externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // keep the 'onChange' ref up to date
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // call `onChange` only when debounced value updates
  useEffect(() => {
    // use the onChange ref to keep it up to date,
    // but not affect calling the effect
    callOnChange(debouncedValue);
  }, [callOnChange, debouncedValue]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      callOnChange(localValue);
    }
  }

  return (
    <input
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onBlur={() => callOnChange(localValue)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default DebouncedInput;
