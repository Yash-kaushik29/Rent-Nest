import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "../context/userContext";

const App = () => {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
