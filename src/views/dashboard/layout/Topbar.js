import React from "react";
import PropTypes from "prop-types";
import { Avatar, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { LogoutOutlined, EditOutlined } from "@ant-design/icons";

import logo from "../../../assets/images/netorc-logo.png";

const { SubMenu } = Menu;

const styles = {
  menuItem: {
    float: "right",
    borderLeft: "thin solid #3d505f",
  },
  logoItem: {
    borderBottom: "none",
  },
  header: {
    backgroundColor: "#0c8dea",
    color: "#fff",
  },
};

const TopBar = ({ user }) => {
  return (
    <div id="topbar">
      <Menu theme="dark" mode="horizontal" style={styles.header}>
        <Menu.Item key="logo" style={styles.logoItem}>
          <Link to="/dashboard" href="global">
            <img src={logo} alt="NetOrc" height={40} />
          </Link>
        </Menu.Item>

        <SubMenu
          style={styles.menuItem}
          title={
            <span>
              <Avatar style={{ color: "#243c4f" }} size="small">
                {user && user.user.username.charAt(0).toUpperCase()}
              </Avatar>{" "}
              {user && user.user.username.toUpperCase()}
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="2">
              <Link to="/user/update-password">
                <EditOutlined />
                Reset Password
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
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

TopBar.defaultProps = {
  user: {},
};

TopBar.propTypes = {
  user: PropTypes.object,
};

export default withRouter(TopBar);
