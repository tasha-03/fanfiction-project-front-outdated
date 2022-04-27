import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";

import store from "./store";
import { getRequest } from "./utilities/requests";
import { login, logout } from "./features/authSlice";

import DashboardPage from "./pages/profile/DashboardPage";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LogIn from "./pages/auth/Login";
import NavBar from "./components/NavBar";
import SignUp from "./pages/auth/SignUp";
import Users from "./pages/users/Users";
import Work from "./pages/works/Work";
import Works from "./pages/works/Works";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import PostWork from "./pages/works/PostWork";

const App = () => {
  const dispatch = useDispatch();
  const autoLogin = async () => {
    const response = await getRequest(
      `users/myself?tz=${Intl.DateTimeFormat().resolvedOptions().timeZone}`
    );
    if (response.success) {
      dispatch(
        login({
          user: response.user,
          token: localStorage.getItem("token"),
        })
      );
    } else {
      dispatch(logout());
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="works">
                <Route index element={<Navigate to="search" />} />
                <Route path="new" element={<PostWork />} />
                <Route path="search" element={<Works />} />
                <Route path=":workId" element={<Work />} />
              </Route>
              <Route path="users">
                <Route index element={<Navigate to="search" />} />
                <Route path="search" element={<Users />} />
                <Route path=":userLogin">
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                </Route>
              </Route>
              <Route path="tags">
                <Route index element={<Navigate to="search" />} />
                <Route path="search" />
                <Route path=":tagId" />
              </Route>
              <Route path="fandoms">
                <Route index element={<Navigate to="category" />} />
                <Route path="category">
                  <Route path=":categoryName" />
                </Route>
                <Route path=":fandomId" />
              </Route>
              <Route path="about">
                <Route index element={<Navigate to="socials" />} />
                <Route path="FAQ" />
                <Route path="socials" />
              </Route>
              <Route path="preferences">
                <Route index />
              </Route>
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="confirm-email" element={<EmailConfirmation />} />
            </Route>
          </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
