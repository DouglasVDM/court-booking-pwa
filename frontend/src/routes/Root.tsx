import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "../components/Profile";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NotFound from "../components/NotFound";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import LoginButton from "../components/LoginButton";
import MembersList from "../components/members/MembersList";
import CourtsList from "../components/courts/CourtsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
  // {
  //   path: "/courts",
  //   element: <CourtsList />,
  // },
  {
    path: "/members",
    element: <MembersList />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Root() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return isAuthenticated ? <Profile /> : <LoginButton />;
  <>
    <div className="app" id="detail">
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
      <Outlet />
    </div>
  </>;
}
