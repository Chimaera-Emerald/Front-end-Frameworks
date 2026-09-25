import MovieCard from "./MovieCard";
import type { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

function MovieList({ movies, onMovieClick }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="empty-state">No movies found.</p>;
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick?.(movie)} />
      ))}
    </div>
  );
}

export default MovieList;