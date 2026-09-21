import { useState } from "react";
import type { MouseEvent } from "react";
import { getPosterUrl } from "../data/sampleMovies";
import type { Movie } from "../types";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

function MovieCard({ movie, onClick }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "TBA";

  const handleFavouriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsFavourite((favourite) => !favourite);
  };

  return (
    <article className="movie-card" onClick={onClick}>
      <div className="poster-wrapper">
        <img
          className="poster-img"
          src={getPosterUrl(movie.poster_path, "w500")}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = getPosterUrl(null, "w500");
          }}
        />
        <div className="poster-overlay">
          <div className="card-top-badges">
            <span className="rating-badge" aria-label={`Rating ${movie.vote_average.toFixed(1)}`}>
              <span aria-hidden="true">★</span> {movie.vote_average.toFixed(1)}
            </span>
            <button
              className={`favorite-btn${isFavourite ? " is-favorite" : ""}`}
              type="button"
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
              onClick={handleFavouriteClick}
            >
              <span aria-hidden="true">{isFavourite ? "♥" : "♡"}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>
        <div className="movie-card-meta">
          <span>{year}</span>
          <span>{movie.vote_count.toLocaleString()} votes</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;