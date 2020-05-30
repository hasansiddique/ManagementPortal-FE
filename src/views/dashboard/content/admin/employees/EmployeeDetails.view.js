import React, { useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  Col, Row, Layout, Typography, Button, Avatar, Spin,
} from 'antd';

import { fetchEmployee } from './employees.api';

const { Content } = Layout;
const { Text } = Typography;

const Employee = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const statusUpdate = useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate']));
  const employee = useSelector((state) => state.getIn(['dashboard', 'admin', 'employees', 'employee']));

  const getEmployee = (employeeId) => dispatch(fetchEmployee(employeeId));

  useEffect(() => {
    getEmployee(id);
  }, []);

  return (
    <>
      <div>
        <Link to="/dashboard/admin/employees">
          <Button type="primary">
            Back
          </Button>
        </Link>
      </div>
      <div style={{ background: '#FAFAFA', minHeight: 280 }}>
        {statusUpdate === 'FETCHED' ? (
          <Content>
            <Row style={{ marginLeft: '195px', marginTop: '25px', padding: '40px' }}>
              {
                employee && employee.employee ? (
                  <Avatar
                    size={180}
                    src={`http://localhost:8000/${employee.employee.photo}`}
                  />
                ) : null
              }
              <Col span={4} style={{ marginLeft: '50px' }}>
                <Text strong> Name: </Text>
                <br />
                <Text strong> Age: </Text>
                <br />
                <Text strong> Gender: </Text>
                <br />
                <Text strong> Designation: </Text>
                <br />
                <Text strong> Email: </Text>
                <br />
                <Text strong> Department: </Text>
                <br />
                <Text strong> JoinDate: </Text>
                <br />
                <Text strong> Address: </Text>
              </Col>
              <Col span={4}>
                <Text>
                  {employee
                && employee.employee
                && employee.employee.name}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.age}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.gender}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.designation}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.email}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.department}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.joinDate.split('T')[0]}
                </Text>
                <br />
                <Text>
                  {employee
                && employee.employee
                && employee.employee.address}
                </Text>
              </Col>
            </Row>
          </Content>
        ) : <Spin size="large" tip="loading..." style={{ marginTop: '100px', marginLeft: '500px' }} /> }
      </div>
    </>
  );
};

export default Employee;
