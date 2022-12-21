import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import { LoginPage } from "./pages/LoginUser";
import Register from "./components/register";

function App() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    });
  };

  useEffect(() => {
    if (!"geolocation in navigator") {
      onError({
        code: 0,
        message: "geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  console.log(location);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />
        <Route path="/transaksi" />
      </Routes>
    </div>
  );
}

export default App;
