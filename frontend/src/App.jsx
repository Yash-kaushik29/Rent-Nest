import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { UserContextProvider } from "../context/userContext";
import AccountDetails from "./pages/AccountDetails";
import Header from "./components/Header";
import Form from "./components/Form";
import PlacePage from  './pages/PlacePage';

const App = () => {
  return (
    <UserContextProvider>
      <Header />
      <Routes>
        <Route path="/" exact element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/account/:subCategory?" element={<AccountDetails />}></Route>
        <Route path="/account/my-accomodations/new" element={<Form />}></Route>
        <Route path="/account/my-accomodations/:id" element={<Form />} ></Route>
        <Route path="/place/:id" element={<PlacePage />} ></Route>
      </Routes>
    </UserContextProvider>
  );
};

export default App;
