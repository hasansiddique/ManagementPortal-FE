import React from 'react';
import PropTypes from 'prop-types';

import TopBar from '../layout/topbar/Topbar.container';

const Dashboard = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated && <TopBar />}
      Dashboard
    </div>
  );
};

Dashboard.defaultProps = {
  isAuthenticated: false,
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
};

Dashboard.styles = {
  layout: {},
};

export default Dashboard;
