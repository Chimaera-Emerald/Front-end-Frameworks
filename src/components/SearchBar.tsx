interface SearchBarProps {
  query?: string;
  value?: string;
  onChange: (value: string) => void;
}

function SearchBar({ query, value, onChange }: SearchBarProps) {
  return (
    <div className="header-search">
      <label className="sr-only" htmlFor="movie-search">
        Search movies
      </label>
      <input
        id="movie-search"
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={query ?? value ?? ""}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;