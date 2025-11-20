import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { loadTheme } from "./theme";

// 🚀 EJECUTAR ANTES DE REACT, AQUÍ MISMO
loadTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
