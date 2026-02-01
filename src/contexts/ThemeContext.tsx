import { createContext, useContext, useState } from "react";
import { applyTheme } from "@/theme";

// 1. Add 'high-contrast' to the type
type Theme = "dark" | "light" | "high-contrast";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.getItem("theme") as Theme) ?? "light",
  );

  const toggle = () => {
    // 2. Update cycle logic: Light -> Dark -> High Contrast -> Light
    let next: Theme;
    if (theme === "light") {
      next = "dark";
    } else if (theme === "dark") {
      next = "high-contrast";
    } else {
      next = "light";
    }

    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
};
