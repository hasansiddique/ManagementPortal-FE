import React from "react";
import { Route } from "react-router-dom";

import { AUTH_ROUTES } from "./common/constants";
import Authentication from "./views/auth/Auth.container";
import Dashboard from "./views/dashboard/Dashboard.container";
import ProtectedComponent from "./components/ProtectedComponent";

const AppRoutes = () => [
  <ProtectedComponent
    key="dashboard"
    path="/dashboard"
    Component={Dashboard}
  />,
  <Route
    exact
    path={AUTH_ROUTES}
    key="authentication"
    component={Authentication}
  />,
];

export default AppRoutes;
