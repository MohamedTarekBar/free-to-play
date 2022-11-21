import React, { useState ,useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout/Layout";
import Home from "./Pages/Home/Home";
import All from "./Pages/All/All";
import Platforms from "./Pages/Platforms/Platforms";
import Sortby from "./Pages/Sortby/Sortby";
import Categories from "./Pages/Categories/Categories";
import UserAuth from './Pages/UserAuth/UserAuth';
import NotFound from './Pages/NotFound/NotFound';
import GameDetails from './Pages/GameDetails/GameDetails';

import jwtDecode from "jwt-decode";
import { signOutUser } from "./Api/UserApi";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function isLocalStorageStoredValidToken() {
    let token = localStorage.getItem("userToken");
    if (token != null) {
      try {
        jwtDecode(token);
        setIsLoggedIn(true);
      } catch (err) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }

  function logOutUser(start, done) {
    start();
    signOutUser((data) => {
      localStorage.setItem("userToken", null);
      setIsLoggedIn(false);
      done();
      return <RouterProvider router={loginRoute} />;
    });
  }

  function logInUser() {
    isLocalStorageStoredValidToken();
  }

  useEffect(() => {
    isLocalStorageStoredValidToken();
  }, []);

  let homeRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoggedIn={isLoggedIn} logOutUser={logOutUser} />,
      children: [
        { index: true, element: <Home/> },
        { path: "all", element: <All/> },
        { path: "platforms/:p", element: <Platforms /> },
        { path: "sortby/:p", element: <Sortby /> },
        { path: "categories/:p", element: <Categories /> },
        { path: "gameDetails/:p", element: <GameDetails /> },
        { path: "/login", element: <Home/> },
        { path: "/register", element: <Home/> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  let loginRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoggedIn={isLoggedIn} />,
      children: [
        { index: true, element: <UserAuth logInUser={logInUser} /> },
        { path: "/login", element: <UserAuth logInUser={logInUser} /> },
        { path: "/register", element: <UserAuth logInUser={logInUser}/> },
        { path: "*", element: <UserAuth logInUser={logInUser} /> },
      ],
    },
  ]);

  if (isLoggedIn) {
    return <RouterProvider router={homeRoute} />;
  } else {
    return <RouterProvider router={loginRoute} />;
  }
}
