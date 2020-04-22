import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;

const styles = {
  menuItem: {
    float: 'right',
    borderLeft: 'thin solid #3d505f',
  },
  logoItem: {
    borderBottom: 'none',
  },
  header: {
    backgroundColor: '#243c50',
    color: '#fff',
  },
};

// TODO: Alerts Implementation, waiting for backend
// TODO: admin panel tab is commented, future plane (Backend Imp)

const TopBar = ({ user }) => {
  return (
    <div id="topbar">
      <Menu
        mode="horizontal"
        style={styles.header}
      >
        <Menu.Item key="logo" style={styles.logoItem}>
          <Link to="/dashboard">
            <img src="" alt="dashboard-img" height={30} />
          </Link>
        </Menu.Item>
        <SubMenu
          style={styles.menuItem}
          title={(
            <span>
              <Avatar
                style={{ color: '#243c4f' }}
                size="small"
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              {' '}
              {user.name.toUpperCase()}
            </span>
          )}
        >
          <Menu.ItemGroup>
            <Menu.Item key="2">
              <Link to="/user/logout">
                <LogoutOutlined />
                Logout
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
      </Menu>
    </div>
  );
};

TopBar.propTypes = {
  user: PropTypes.object.isRequired,
};


export default withRouter(TopBar);
