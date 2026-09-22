import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "atlas-theme";

function lireThemeSysteme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function lireThemeInitial(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const stocke = window.localStorage.getItem(STORAGE_KEY);
    if (stocke === "light" || stocke === "dark") return stocke;
  } catch {
    // stockage indisponible (navigation privée, etc.) : on ignore
  }
  return lireThemeSysteme();
}

/**
 * Thème clair/sombre de l'appli, choisi à la main via le bouton soleil/lune
 * (voir ThemeToggle) et mémorisé dans localStorage. Suit la préférence
 * système tant que l'utilisateur n'a rien choisi explicitement.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(lireThemeInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // pas grave si on ne peut pas persister
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(() => setThemeState((t) => (t === "dark" ? "light" : "dark")), []);

  return { theme, setTheme, toggleTheme };
}
