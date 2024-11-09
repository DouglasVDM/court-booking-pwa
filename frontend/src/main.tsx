import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.tsx";

const root = createRoot(document.getElementById("root"));
const YOUR_AUTH0_DOMAIN = import.meta.env.VITE_YOUR_AUTH0_DOMAIN;
const YOUR_AUTH0_CLIENT_ID = import.meta.env.VITE_YOUR_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider
    domain={YOUR_AUTH0_DOMAIN}
    clientId={YOUR_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
