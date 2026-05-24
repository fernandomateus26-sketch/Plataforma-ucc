import { HelmetProvider } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AppLayout } from "../shared/layout/layout";
import { PaginaInicial } from "../pages/pages";
import { ThemeProvider } from "../shared/context/themeContext";

function AppRoutes() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="paginaInicial" replace />} />
            <Route path="paginaInicial" element={<PaginaInicial />} />
          </Route>

        </Routes>
      </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default AppRoutes;
