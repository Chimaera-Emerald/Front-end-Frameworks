import { Link, NavLink } from "react-router-dom";
import type { Theme } from "../types";

interface HeaderProps { search: string; onSearch: (value: string) => void; onlyFavorites: boolean; onToggleFavorites: () => void; theme: Theme; onToggleTheme: () => void; favCount: number; onOpenApiConfig: () => void; }

function Header({ search, onSearch, onlyFavorites, onToggleFavorites, theme, onToggleTheme, favCount, onOpenApiConfig }: HeaderProps) {
  return <header className="site-header"><div className="header-inner"><Link className="brand-logo" to="/">CINE<span className="logo-dot" />GRID</Link><nav className="site-nav" aria-label="Main navigation"><NavLink to="/" end>Home</NavLink><NavLink to="/about">About</NavLink></nav><div className="header-search"><label className="sr-only" htmlFor="movie-search">Search movies</label><input id="movie-search" className="search-input" type="text" placeholder="Search movies..." value={search} onChange={(event) => onSearch(event.target.value)} /></div><div className="header-actions"><button className={`btn-icon-label${onlyFavorites ? " active" : ""}`} type="button" onClick={onToggleFavorites} aria-label="Toggle favourites">♥ <span>Watchlist</span> <span className="count-badge">{favCount}</span></button><button className="btn-secondary" type="button" onClick={onOpenApiConfig}>API Key</button><button className="theme-toggle-btn" type="button" onClick={onToggleTheme} aria-label="Toggle theme">{theme === "dark" ? "☼" : "☾"}</button></div></div></header>;
}

export default Header;