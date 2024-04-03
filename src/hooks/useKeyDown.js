import { useEffect } from "react";

export function useKeyDown(key, action) {
  useEffect(() => {
    function callback(e) {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [key, action]);
}
