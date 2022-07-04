import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-ewi8acgy.us.auth0.com"
      clientId="NYi8tqfhTxrUs0sa5aCd0KyLaIw8J9zi"
      redirectUri={window.location.origin}
      cacheLocation = 'localstorage'
    >
      <BrowserRouter>
        <GithubProvider>
          <App />
        </GithubProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
