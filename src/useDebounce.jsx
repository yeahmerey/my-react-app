import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 1000) {
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounce;
}
