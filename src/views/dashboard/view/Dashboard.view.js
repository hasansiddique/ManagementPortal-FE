import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserAddOutlined,
  UserOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons';

import TopBar from '../../layout/topbar/Topbar.container';
import CRUDEmployee from '../components/CRUD.Employee';
import Test from './Test';
import './Dashboard.view.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const Dashboard = ({
                     isAuthenticated,
                     createEmployee,
                     getAllEmployees,
                     employee,
                     loading,
                     isCreatingSuccess,
                     deleteEmployee,
                     isDeletingSuccess,
                       getSingleEmployee,
                       updateSingleEmployee,
                       singleEmployee,
                       isUpdated,

}) => {
  const [state, setState] = useState({collapsed: false})
  const [title, setTitle] = useState('Manage')
  const [subTitle, setSubTitle] = useState('Employee')
  const [value, setValue] = useState(1)

  const onCollapse = collapsed => {
    setState({ collapsed });
  }
    return (
    <div>
      {isAuthenticated ?
          <Layout style={{ minHeight: '100vh' }}>
        <Sider
            collapsible collapsed={state.collapsed} onCollapse={onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <SubMenu key="sub1" icon={<UserOutlined />} title="Manage" >
                  <Menu.Item key="1" onClick={() => {setTitle('Manage'); setSubTitle('Employee'); setValue(1)}} >
                      <UserAddOutlined />
                      <span>Employee</span>
                  </Menu.Item>
                  <Menu.Item key="2" onClick={() => {setTitle('Manage'); setSubTitle('Test'); setValue(2)}} >
                      <PlayCircleOutlined />
                      <span>Test</span>
                  </Menu.Item>
              </SubMenu>
              <Menu.Item key="3" onClick={() => {setTitle('Test2'); setSubTitle(''); setValue(3)}} >
                  <PlayCircleOutlined />
                  <span>Test2</span>
              </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          <Header className="site-layout-background" style={{ padding: 15.35, backgroundColor: '#243c50' }}>
            <TopBar />
          </Header>
          <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Admin</Breadcrumb.Item>
                  <Breadcrumb.Item>{title}</Breadcrumb.Item>
                  <Breadcrumb.Item>{subTitle}</Breadcrumb.Item>
              </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 15, minHeight: 360, }}>
                {value === 1 ? ( <CRUDEmployee
                    handleSubmit={createEmployee}
                    handleFetching={getAllEmployees}
                    employeeState={employee}
                    singleEmployeeState={singleEmployee}
                    loading={loading}
                    Success={isCreatingSuccess}
                    handleDeletion={deleteEmployee}
                    deletion={isDeletingSuccess}
                    getSingleEmployee={getSingleEmployee}
                    updateSingleEmployee={updateSingleEmployee}
                    onUpdate={isUpdated}
                />) : value === 2 ? (<Test />)
                    : value === 3 ? console.log(`value changed now render here other component ${value}`) : null }

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Copy Rights@ Wanclouds 2020</Footer>
        </Layout>
      </Layout>
          : null }

    </div>
  );
};

Dashboard.defaultProps = {
  isAuthenticated: false,
};

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  createEmployee: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  getSingleEmployee: PropTypes.func.isRequired,
  updateSingleEmployee: PropTypes.func.isRequired,
  employee: PropTypes.any,
  singleEmployee: PropTypes.any,
  loading: PropTypes.bool,
    isUpdated: PropTypes.bool,
  isCreatingSuccess: PropTypes.bool,
  isDeletingSuccess: PropTypes.bool,
};

Dashboard.styles = {};

export default Dashboard;
