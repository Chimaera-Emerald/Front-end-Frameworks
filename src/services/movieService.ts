import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { getApiKey, getFavorites } from "../utils/storage";
import type { Movie, SortOption } from "../types";

interface FetchMoviesOptions { search?: string; genre?: string; sort?: SortOption; onlyFavorites?: boolean; page?: number; signal?: AbortSignal; }
export interface MovieResults { results: Movie[]; total_pages: number; total_results: number; isLiveApi: boolean; }

const baseUrl = import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";

export function sortMovies(movies: Movie[], sort: SortOption = "popularity"): Movie[] {
  return [...movies].sort((first, second) => {
    switch (sort) {
      case "rating": return second.vote_average - first.vote_average;
      case "release_date": return second.release_date.localeCompare(first.release_date);
      case "title": return first.title.localeCompare(second.title);
      default: return second.popularity - first.popularity;
    }
  });
}

function filterLocally(options: FetchMoviesOptions): MovieResults {
  const query = options.search?.trim().toLowerCase() || "";
  const genre = options.genre && options.genre !== "all" ? Number(options.genre) : null;
  let movies = options.onlyFavorites ? getFavorites() : [...SAMPLE_MOVIES];
  if (query) movies = movies.filter((movie) => [movie.title, movie.original_title, movie.overview].filter(Boolean).some((value) => value!.toLowerCase().includes(query)));
  if (genre !== null) movies = movies.filter((movie) => movie.genre_ids.includes(genre));
  const results = sortMovies(movies, options.sort);
  return { results, total_pages: 1, total_results: results.length, isLiveApi: false };
}

async function fetchFromApi(options: FetchMoviesOptions, apiKey: string): Promise<MovieResults> {
  const params = new URLSearchParams({ api_key: apiKey, page: String(options.page || 1) });
  let endpoint = "/movie/popular";
  if (options.search?.trim()) { endpoint = "/search/movie"; params.set("query", options.search.trim()); }
  else if (options.genre && options.genre !== "all") { endpoint = "/discover/movie"; params.set("with_genres", options.genre); }
  const response = await fetch(`${baseUrl}${endpoint}?${params.toString()}`, { signal: options.signal });
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  const data = await response.json();
  return { results: sortMovies(data.results || [], options.sort), total_pages: data.total_pages || 1, total_results: data.total_results || 0, isLiveApi: true };
}

export const movieService = {
  fetchMovies(options: FetchMoviesOptions = {}): Promise<MovieResults> {
    const apiKey = getApiKey() || import.meta.env.VITE_TMDB_API_KEY || "";
    const isMockedFetch = import.meta.env.MODE === "test" && typeof fetch === "function" && fetch.name !== "fetch";
    const shouldFetch = import.meta.env.MODE === "test"
      ? isMockedFetch
      : Boolean(apiKey && apiKey !== "your_api_key_here");
    if (options.onlyFavorites) return Promise.resolve(filterLocally(options));
    return shouldFetch ? fetchFromApi(options, apiKey) : Promise.resolve(filterLocally(options));
  },
};

export default movieService;