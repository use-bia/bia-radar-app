import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { getLocale, setLocale } from "@/paraglide/runtime.js";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import { applyTheme, getSystemTheme } from "./theme.ts";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { audioEngine } from "./audio/audioEngine.ts";
import { AudioSettingsProvider } from "./contexts/AudioSettingsContext.tsx";

const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
const theme = storedTheme ?? getSystemTheme();

applyTheme(theme);
audioEngine.init();

const hashHistory = createHashHistory();

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  history: hashHistory,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  setLocale(getLocale() ?? "pt-br");
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <AudioSettingsProvider>
          <RouterProvider router={router} />
        </AudioSettingsProvider>
      </ThemeProvider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
