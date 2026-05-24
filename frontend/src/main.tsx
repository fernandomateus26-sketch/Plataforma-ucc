import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./app/routes/routes.routes";

import "./assets/styles/globals.css";
import "./assets/styles/variables.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
);
