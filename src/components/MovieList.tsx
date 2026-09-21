import MovieCard from "./MovieCard";
import type { Movie } from "../types";

interface MovieListProps {
  movies: Movie[];
}

function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p className="empty-state">No movies found.</p>;
  }

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;