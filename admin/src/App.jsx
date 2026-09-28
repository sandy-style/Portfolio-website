import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  console.log(token);

  return (
    <>
      {token ? (
        <div>
          <Navbar token={token} setToken={setToken} />
          <Routes>
            <Route path="/" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
          </Routes>
        </div>
      ) : (
        <div>
          <Login setToken={setToken} />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default App;
