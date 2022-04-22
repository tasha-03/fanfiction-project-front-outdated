import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Work from "./pages/works/Work";
import Works from "./pages/works/Works";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./pages/users/Users";
import SignUp from "./pages/auth/SignUp";
import LogIn from "./pages/auth/Login";
import { Container } from "react-bootstrap";
import EmailConfirmation from "./pages/auth/EmailConfirmation";
import Dashboard from "./pages/users/Dashboard";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { getRequest } from "./utilities/requests";
import { login } from "./features/authSlice";

import "./index.css";

const App = () => {
  const dispatch = useDispatch();
  const autoLogin = async () => {
    const response = await getRequest("users/myself");
    if (response.success) {
      dispatch(
        login({
          user: response.user,
          token: localStorage.getItem("token"),
        })
      );
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
                <Route path="search" element={<Works />} />
                <Route path=":workId" element={<Work />} />
              </Route>
              <Route path="users">
                <Route index element={<Navigate to="search" />} />
                <Route path="search" element={<Users />} />
                <Route path=":userLogin">
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="works">
                    <Route index />
                    <Route path="drafts" />
                  </Route>
                  <Route path="history" />
                  <Route path="collections" />
                  <Route path="series" />
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
