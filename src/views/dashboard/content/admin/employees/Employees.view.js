import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import { ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Modal,
  Radio,
  Row,
  Spin,
} from 'antd';

import storage from '../../../../../common/storage';
import { USER_STATE } from '../../../../../common/constants';
import ModalView from './Employees.form';
import TableHeader from './views/tableHeader';

const { Content } = Layout;
const { confirm } = Modal;

const EmployeesView = ({
  employees,
  statusUpdate,
  createEmployee,
  getAllEmployees,
  loading,
  deleteEmployee,
  getSingleEmployee,
  employee,
  updateEmployee,
}) => {
  const [visibleAdd, setVisibleAdd] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [search, setSearch] = useState({ subString: '' });
  const [page, setPage] = useState({ current: 1 });
  const [id, setId] = useState('');
  const [radioButton, setRadioBtn] = useState('');

  const typeOfId = get(storage.get('user'), 'user.typeOfId');

  const status = {
    CREATED: 'CREATED',
    DELETED: 'DELETED',
    UPDATED: 'UPDATED',
  };

  useEffect(() => {
    getAllEmployees();
  }, [status[statusUpdate]]);

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [id]);

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content:
        'After this operation user will permanently deleted from database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deleteEmployee(itemId);
      },
    });
  };

  const showModalCreate = () => {
    setVisibleAdd(true);
  };

  const showModalUpdate = () => {
    setVisibleUpdate(true);
  };

  const handleSearch = (e) => {
    setSearch({ subString: e.target.value });
    setPage({
      current: 1,
    });
  };

  const handleClick = () => {
    setRadioBtn('');
  };

  const onRadioChange = (e) => setRadioBtn(e.target.value);

  return (
    <Content>
      <Row>
        <Col span={10}>
          {typeOfId === USER_STATE.ADMIN_FULL && (
            <Button type="primary" onClick={showModalCreate}>
              <UserAddOutlined />
              Add Employee
            </Button>
          )}
          <ModalView
            createEmployee={createEmployee}
            updateEmployee={updateEmployee}
            employee={employee}
            visibleAdd={visibleAdd}
            setVisibleAdd={setVisibleAdd}
            visibleUpdate={visibleUpdate}
            setVisibleUpdate={setVisibleUpdate}
            id={id}
            setId={setId}
          />
        </Col>
        <Col span={8}>
          <Radio.Group onChange={onRadioChange} defaultValue="">
            <Radio.Button value="Front-End">Front-End</Radio.Button>
            <Radio.Button value="Back-End">Back-End</Radio.Button>
            <Radio.Button value="Dev-Ops">Dev-Ops</Radio.Button>
            <Radio.Button value="">All</Radio.Button>
          </Radio.Group>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Input
              placeholder="filter by name"
              onChange={handleSearch}
              onClick={handleClick}
            />
          </Form.Item>
        </Col>
      </Row>
      {loading ? (
        <Spin
          size="large"
          tip="Loading..."
          style={{ paddingTop: 100, width: 900 }}
        />
      ) : (
        <TableHeader
          employees={employees}
          setId={setId}
          loading={loading}
          showDeleteConfirm={showDeleteConfirm}
          showModalForUpdate={showModalUpdate}
          search={search}
          page={page}
          setPage={setPage}
          radioButton={radioButton}
        />
      )}
    </Content>
  );
};

EmployeesView.defaultProps = {
  employee: null,
};

EmployeesView.propTypes = {
  createEmployee: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  getSingleEmployee: PropTypes.func.isRequired,
  updateEmployee: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  employees: PropTypes.any.isRequired,
  employee: PropTypes.object,
  statusUpdate: PropTypes.string.isRequired,
};

export default EmployeesView;
