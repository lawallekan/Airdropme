import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/auth/LoginPage";
import LandingPage from "./components/LandingPage";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import routes from "tempo-routes";

function App() {
  return (
    <AuthProvider>
      {/* Tempo routes */}
      {import.meta.env.VITE_TEMPO && useRoutes(routes)}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        {/* Add more routes as needed */}
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </AuthProvider>
  );
}

export default App;
