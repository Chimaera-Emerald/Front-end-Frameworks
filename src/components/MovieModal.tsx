import { useEffect } from "react";
import { getBackdropUrl, getPosterUrl } from "../data/sampleMovies";
import { getGenreNames } from "../data/genres";
import { getFavorites, toggleFavorite } from "../utils/storage";
import type { Movie } from "../types";

interface MovieModalProps { movie: Movie; onClose: () => void; }

function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", handleKeyDown); };
  }, [onClose]);
  const isFavorite = getFavorites().some((favorite) => favorite.id === movie.id);
  return <div className="modal-overlay active" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-movie-title"><button className="modal-close-btn" type="button" aria-label="Close" onClick={onClose}>×</button><div className="modal-backdrop-hero" style={{ backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})` }} /><div className="modal-body"><img className="modal-poster" src={getPosterUrl(movie.poster_path)} alt={`${movie.title} poster`} /><div className="modal-content-details"><h2 id="modal-movie-title" className="modal-title">{movie.title}</h2><div className="modal-meta-row"><span className="rating-badge">★ {movie.vote_average.toFixed(1)} / 10</span><span>{movie.release_date || "Unknown release date"}</span></div><div className="movie-genres-tags">{getGenreNames(movie.genre_ids).map((genre) => <span className="genre-tag" key={genre}>{genre}</span>)}</div><div className="modal-overview"><h4 className="modal-overview-heading">Overview</h4><p>{movie.overview || "No plot synopsis available."}</p></div><div className="modal-footer-actions"><button className="btn-primary" type="button" onClick={() => toggleFavorite(movie)}>{isFavorite ? "Remove from Watchlist" : "Add to Watchlist"}</button><a className="btn-secondary" href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.title} trailer`)}`} target="_blank" rel="noreferrer">Watch Trailer</a></div></div></div></div></div>;
}

export default MovieModal;