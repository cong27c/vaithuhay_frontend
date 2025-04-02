import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [input, setInput] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInput(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return input;
}

export default useDebounce;
