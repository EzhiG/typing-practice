import "./index.css";
import "antd/dist/antd.css";
import React from "react";
import Login from "./pages/login";
import NotFound from "./pages/not-found";
import ReactDOM from "react-dom";
import Dashboard from "./pages/dashboard";
import { Router } from "@reach/router";
import { LogedInProvider } from "./providers/loged-in-user";
import { Page } from "./entities/page";

ReactDOM.render(
  <React.StrictMode>
    <LogedInProvider>
      <Router>
        <Dashboard path={Page.DASHBOARD} />
        <Login path={Page.LOGIN} />
        <NotFound default />
      </Router>
    </LogedInProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
