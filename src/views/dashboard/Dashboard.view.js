import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { withRouter, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import TopBar from './layout/Topbar';
import Sidebar from './layout/Sidebar';
import Content from './content/DashboardContent';
import { USER_STATE } from '../../common/constants';

const Dashboard = ({
  isAuthenticated, location, match, user,
}) => {
  const [collapsed, toggleSideBar] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated && user && user.user && location
      && (location.pathname === '/dashboard' || location.pathname === '/dashboard/admin')) {
      if (user.user.typeOfId === USER_STATE.ADMIN_FULL
        || user.user.typeOfId === USER_STATE.ADMIN_PARTIAL) {
        history.push('/dashboard/admin/employees');
      } else if (user.user.typeOfId === USER_STATE.EMPLOYEE) {
        history.push('/dashboard/employee');
      }
    }
  });

  return (
    <div id="dashboard">
      <TopBar user={user} />
      <Layout className="layout">
        <Sidebar
          user={user}
          match={match}
          location={location}
          collapsed={collapsed}
          toggleSideBar={() => toggleSideBar(!collapsed)}
        />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content match={match} location={location} />
        </Layout>
      </Layout>
    </div>
  );
};

Dashboard.defaultProps = {
  user: {},
};

Dashboard.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {};

export default withRouter(Dashboard);
