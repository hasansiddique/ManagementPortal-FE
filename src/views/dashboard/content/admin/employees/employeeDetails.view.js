import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Col, Row, Layout, Typography, Button, Avatar, Spin,
} from 'antd';

import { employee } from './employees.api';

const { Content } = Layout;
const { Text } = Typography;

const Employee = ({
  match, getEmployee, employeeState, statusUpdate,
}) => {
  useEffect(() => {
    getEmployee(match.params.id);
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
                employeeState && employeeState.employee ? (
                  <Avatar
                    size={180}
                    src={`http://localhost:8000/${employeeState.employee.photo}`}
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
                  {employeeState
                && employeeState.employee
                && employeeState.employee.name}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.age}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.gender}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.designation}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.email}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.department}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.joinDate.split('T')[0]}
                </Text>
                <br />
                <Text>
                  {employeeState
                && employeeState.employee
                && employeeState.employee.address}
                </Text>
              </Col>
            </Row>
          </Content>
        ) : <Spin size="large" tip="loading..." style={{ marginTop: '100px', marginLeft: '500px' }} /> }
      </div>
    </>
  );
};

Employee.defaultProps = {
  employeeState: null,
};

Employee.propTypes = {
  match: PropTypes.object.isRequired,
  getEmployee: PropTypes.func.isRequired,
  employeeState: PropTypes.object,
  statusUpdate: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  employeeState: state.getIn(['dashboard', 'admin', 'employees', 'employee']),
  statusUpdate: state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate']),
});

const mapDispatchToProps = (dispatch) => ({
  getEmployee: (id) => {
    dispatch(employee(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
