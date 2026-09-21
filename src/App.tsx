import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

function App() {
  const [movies] = useState(SAMPLE_MOVIES);
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);

  const filteredMovies = movies.filter((movie) => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchesQuery =
      !normalizedQuery ||
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.overview.toLowerCase().includes(normalizedQuery) ||
      movie.original_title?.toLowerCase().includes(normalizedQuery);

    return Boolean(matchesQuery) && movie.vote_average >= minRating;
  });

  return (
    <div className="app-layout">
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-logo">CINE<span className="logo-dot" />GRID</div>
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </header>
      <main className="main-container">
        <section className="session-heading">
          <p className="eyebrow">Popular films</p>
          <h1>Find your next movie</h1>
          <p className="results-summary">{filteredMovies.length} movies in your collection</p>
        </section>
        <label className="rating-filter" htmlFor="minimum-rating">
          Minimum rating
          <select
            id="minimum-rating"
            value={minRating}
            onChange={(event) => setMinRating(Number(event.target.value))}
          >
            <option value={0}>All ratings</option>
            <option value={7}>7+</option>
            <option value={8}>8+</option>
          </select>
        </label>
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  )
}

export default App
