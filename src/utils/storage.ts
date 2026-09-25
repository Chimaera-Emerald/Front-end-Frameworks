import type { Movie, Theme } from "../types";

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";
const API_KEY = "cinegrid_api_key";

export function getFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(movie: Movie): Movie[] {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.id === movie.id);
  const updated = exists ? favorites.filter((item) => item.id !== movie.id) : [movie, ...favorites];
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export function getTheme(): Theme {
  return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY)?.trim() || "";
}

export function setApiKey(key: string): void {
  localStorage.setItem(API_KEY, key.trim());
}