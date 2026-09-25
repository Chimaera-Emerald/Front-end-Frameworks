import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { getFavorites, getTheme } from "../utils/storage";
import type { Movie, Theme } from "../types";

interface AppState { favorites: Movie[]; theme: Theme; }
type Action = { type: "TOGGLE_FAVOURITE"; movie: Movie } | { type: "SET_THEME"; theme: Theme };

function getInitialState(): AppState {
  return { favorites: getFavorites(), theme: getTheme() };
}

function reducer(state: AppState, action: Action): AppState {
  if (action.type === "SET_THEME") return { ...state, theme: action.theme };
  const exists = state.favorites.some((movie) => movie.id === action.movie.id);
  return { ...state, favorites: exists ? state.favorites.filter((movie) => movie.id !== action.movie.id) : [action.movie, ...state.favorites] };
}

interface AppContextValue extends AppState { toggleFavorite: (movie: Movie) => void; isFavorite: (id: number) => boolean; toggleTheme: () => void; }
const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, getInitialState);
  useEffect(() => { localStorage.setItem("cinegrid_favorites", JSON.stringify(state.favorites)); }, [state.favorites]);
  useEffect(() => { localStorage.setItem("cinegrid_theme", state.theme); document.documentElement.setAttribute("data-theme", state.theme); }, [state.theme]);
  const value: AppContextValue = { ...state, toggleFavorite: (movie) => dispatch({ type: "TOGGLE_FAVOURITE", movie }), isFavorite: (id) => state.favorites.some((movie) => movie.id === id), toggleTheme: () => dispatch({ type: "SET_THEME", theme: state.theme === "dark" ? "light" : "dark" }) };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used inside AppProvider");
  return context;
}