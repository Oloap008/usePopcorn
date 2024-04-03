import { useRef } from "react";
import { useKeyDown } from "../hooks/useKeyDown";

function SearchBar({ query, onQuery }) {
  const inputEl = useRef(null);

  useKeyDown("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
  });

  return (
    <input
      className="search"
      type="text"
      ref={inputEl}
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      placeholder="Search movies..."
    />
  );
}

export default SearchBar;
