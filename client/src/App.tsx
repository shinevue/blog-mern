import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import { store } from "./app/store";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import Navbar from "./components/layout/navbar";
import Dashboard from "./components/Dashboard";
import jwt_decode from "jwt-decode";
import Profile from "./components/MyBlog";
import Detail from "./components/Detail";
// import { setCurrntUser } from "./action/authAction";
if (localStorage.token) {
  const decoded = jwt_decode(localStorage.token);
  const currentTime = Date.now() / 1000;
}

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/myblog" element={<Profile />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
