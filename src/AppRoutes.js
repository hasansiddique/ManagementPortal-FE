import React from 'react';
import { Route } from 'react-router-dom';

import Authentication from './views/auth/Auth.container';
import { AUTH_ROUTES } from './common/constants';
import Dashboard from './views/dashboard/Dashboard.container';
import Employee from './views/employee/Employee.container';
import ProtectedComponent from './components/ProtectedComponent';

const AppRoutes = () => [
  <ProtectedComponent
    exact
    key="dashboard"
    Component={Dashboard}
    path={['/dashboard']}
  />,
  <ProtectedComponent
    exact
    key="employee"
    Component={Employee}
    path={['/employee']}
  />,
  <Route
    exact
    component={Authentication}
    path={AUTH_ROUTES}
    key="authentication"
  />
];

export default AppRoutes;
