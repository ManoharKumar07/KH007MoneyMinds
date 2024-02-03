import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./App";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { useSelector } from "react-redux";
import Spinner from "./Components/Spinner";
import ProtectedRoute from "./Components/ProtectedRoute";
import PublicRoute from "./Components/PublicRoute";

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <RegisterPage />
                </PublicRoute>
              }
            />
            <Route path="/spin" element={<Spinner />} />
            {/* <Route path="/payment" element={<Payment />} /> */}
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default App;
