// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx"; // Pastikan path ini benar

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <App /> {/* HANYA RENDER KOMPONEN APP DI SINI */}
    </ThemeProvider>
  </React.StrictMode>
);
