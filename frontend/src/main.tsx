import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.tsx";
import LoginButton from "./components/LoginButton.tsx";
import Profile from "./components/Profile.tsx";
import Dashboard from "./components/Dashboard.tsx";
import NotFound from "./components/NotFound.tsx";

const root = createRoot(document.getElementById("root"));
const YOUR_AUTH0_DOMAIN = import.meta.env.VITE_YOUR_AUTH0_DOMAIN;
const YOUR_AUTH0_CLIENT_ID = import.meta.env.VITE_YOUR_AUTH0_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginButton />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

root.render(
  <Auth0Provider
    domain={YOUR_AUTH0_DOMAIN}
    clientId={YOUR_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <div className="app">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </div>
  </Auth0Provider>
);
