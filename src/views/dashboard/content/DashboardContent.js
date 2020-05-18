import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import PropTypes from 'prop-types';

import Admins from './admin/Admins.container';
import Employees from './user/User.container';
import ProtectedComponent from '../../../components/ProtectedComponent';

const { Content } = Layout;

const date = new Date();

const DashboardContent = ({ match, location }) => {
  return [
    <div
      style={{
        background: 'white',
        padding: '0 24px',
        margin: '0 -24px',
      }}
    >
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <h1 style={{ fontSize: '1.3rem' }}>Employees</h1>
    </div>,
    <Content id="dashboard-content" key="dashboard-content">
      <ProtectedComponent
        path={`${match.url}/admin`}
        Component={Admins}
        match={match}
        location={location}
      />
      <ProtectedComponent
        path={`${match.url}/employee`}
        Component={Employees}
        match={match}
        location={location}
      />
    </Content>,
    <footer
      style={{ textAlign: 'center', padding: '10px' }}
      key="dashboard-footer"
    >
      {`WanClouds, Inc. Copyrights ${date.getFullYear()}.`}
    </footer>,
  ];
};

DashboardContent.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

DashboardContent.defaultProps = {};

export default DashboardContent;
