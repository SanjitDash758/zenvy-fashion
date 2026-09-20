"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Default to "light" if nothing is stored
    const stored = localStorage.getItem("zenvy_admin_theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else {
      setTheme("light"); // ← ডিফল্ট লাইট
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("zenvy_admin_theme", theme);
    const root = document.documentElement;

    // Explicitly remove both classes first
    root.classList.remove("light", "dark");

    // Then add the current theme
    root.classList.add(theme);

    // Set color-scheme for native elements (scrollbar, form inputs)
    root.style.colorScheme = theme;

    console.log("Theme applied:", theme, "| Classes:", root.className);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
