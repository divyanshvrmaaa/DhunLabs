import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages are pre-rendered to HTML at build time; take that HTML over instead of redrawing it.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
