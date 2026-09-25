import { GENRES } from "../data/genres";
import type { SortOption, ViewMode } from "../types";

interface FilterBarProps { genre: string; onGenreChange: (genre: string) => void; sort: SortOption; onSortChange: (sort: SortOption) => void; viewMode: ViewMode; onViewModeChange: (mode: ViewMode) => void; }

function FilterBar({ genre, onGenreChange, sort, onSortChange, viewMode, onViewModeChange }: FilterBarProps) {
  return <div className="filter-bar"><div className="genre-pills-scroll"><button className={`genre-pill${genre === "all" ? " active" : ""}`} type="button" onClick={() => onGenreChange("all")}>All Movies</button>{Object.entries(GENRES).map(([id, name]) => <button className={`genre-pill${genre === id ? " active" : ""}`} type="button" key={id} onClick={() => onGenreChange(id)}>{name}</button>)}</div><div className="filter-actions-right"><label className="sr-only" htmlFor="sort-movies">Sort movies by</label><select id="sort-movies" className="sort-select" value={sort} onChange={(event) => onSortChange(event.target.value as SortOption)}><option value="popularity">Most Popular</option><option value="rating">Highest Rated</option><option value="release_date">Release Date</option><option value="title">Title (A-Z)</option></select><div className="view-toggle-group"><button className={`view-btn${viewMode === "grid" ? " active" : ""}`} type="button" aria-label="Grid view" onClick={() => onViewModeChange("grid")}>▦</button><button className={`view-btn${viewMode === "list" ? " active" : ""}`} type="button" aria-label="List view" onClick={() => onViewModeChange("list")}>☷</button></div></div></div>;
}

export default FilterBar;