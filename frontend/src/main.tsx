import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Auth0ProviderWithRedirect from "./authentication/Auth0ProviderWithRedirect.tsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithRedirect>
        <div className="app">
          <App />
        </div>
      </Auth0ProviderWithRedirect>
    </BrowserRouter>
  </StrictMode>
);
