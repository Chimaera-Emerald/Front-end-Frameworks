import { useEffect, useState } from "react";
import movieService from "../services/movieService";
import type { Movie } from "../types";

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    movieService.fetchMovies({ signal: controller.signal }).then((data) => setMovies(data.results)).catch((reason: unknown) => {
      if (reason instanceof DOMException && reason.name === "AbortError") return;
      setError(reason instanceof Error ? reason.message : "Unable to load movies.");
    }).finally(() => setIsLoading(false));
    return () => controller.abort();
  }, []);
  return { movies, isLoading, error };
}