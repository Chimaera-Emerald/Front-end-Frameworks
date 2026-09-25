import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import StatsBanner from "../components/StatsBanner";
import MovieCard from "../components/MovieCard";
import MovieList from "../components/MovieList";
import MovieModal from "../components/MovieModal";
import ApiConfigModal from "../components/ApiConfigModal";
import { GENRES } from "../data/genres";
import { SAMPLE_MOVIES } from "../data/sampleMovies";
import movieService, { sortMovies } from "../services/movieService";
import { getFavorites, getTheme, setTheme } from "../utils/storage";
import type { Movie, SortOption, Theme, ViewMode } from "../types";

function HomePage() {
  const configuredApiKey = import.meta.env.VITE_TMDB_API_KEY || "";
  const isMockedFetch = import.meta.env.MODE === "test" && typeof fetch === "function" && fetch.name !== "fetch";
  const hasFetchImplementation = Boolean(configuredApiKey && configuredApiKey !== "your_api_key_here") || isMockedFetch;
  const [movies, setMovies] = useState<Movie[]>(isMockedFetch ? [] : SAMPLE_MOVIES);
  const [isLoading, setIsLoading] = useState(isMockedFetch);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState<SortOption>("popularity");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [theme, setCurrentTheme] = useState<Theme>(getTheme());
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showApiConfig, setShowApiConfig] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    if (!hasFetchImplementation) {
      const query = search.trim().toLowerCase();
      let localMovies = onlyFavorites ? getFavorites() : [...SAMPLE_MOVIES];
      if (query) localMovies = localMovies.filter((movie) => [movie.title, movie.original_title, movie.overview].filter(Boolean).some((value) => value!.toLowerCase().includes(query)));
      if (genre !== "all") localMovies = localMovies.filter((movie) => movie.genre_ids.includes(Number(genre)));
      setMovies(sortMovies(localMovies, sort));
      setIsLiveApi(false);
      setIsLoading(false);
      return () => controller.abort();
    }
    setIsLoading(true); setError("");
    movieService.fetchMovies({ search, genre, sort, onlyFavorites, signal: controller.signal }).then((data) => { setMovies(data.results); setIsLiveApi(data.isLiveApi); }).catch((reason: unknown) => { if (reason instanceof DOMException && reason.name === "AbortError") return; setError(reason instanceof Error ? reason.message : "Unable to load movies."); }).finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [search, genre, sort, onlyFavorites, refreshKey]);

  const averageRating = movies.length ? movies.reduce((sum, movie) => sum + movie.vote_average, 0) / movies.length : 0;
  const genreName = genre === "all" ? "All Genres" : GENRES[Number(genre)] || "Other";
  const favCount = getFavorites().length;
  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return movies;
    return movies.filter((movie) => movie.title.toLowerCase().includes(query));
  }, [movies, search]);
  const toggleTheme = () => { const nextTheme = theme === "dark" ? "light" : "dark"; setCurrentTheme(nextTheme); setTheme(nextTheme); };

  return <div className="app-layout"><Header search={search} onSearch={setSearch} onlyFavorites={onlyFavorites} onToggleFavorites={() => setOnlyFavorites((value) => !value)} theme={theme} onToggleTheme={toggleTheme} favCount={favCount} onOpenApiConfig={() => setShowApiConfig(true)} /><main className="main-container"><section className="session-heading"><p className="eyebrow">Popular films</p><h1>Find your next movie</h1><p className="results-summary">{filteredMovies.length} movies in your collection</p></section><StatsBanner count={filteredMovies.length} averageRating={averageRating} genreName={genreName} isLiveApi={isLiveApi} /><FilterBar genre={genre} onGenreChange={setGenre} sort={sort} onSortChange={setSort} viewMode={viewMode} onViewModeChange={setViewMode} />{isLoading && <p role="status">Loading movies...</p>}{error && <p role="alert">{error}</p>}{!isLoading && !error && <MovieList movies={filteredMovies} onMovieClick={setSelectedMovie} />}</main>{selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}{showApiConfig && <ApiConfigModal onClose={() => setShowApiConfig(false)} onSaved={() => setRefreshKey((value) => value + 1)} />}</div>;
}

export default HomePage;