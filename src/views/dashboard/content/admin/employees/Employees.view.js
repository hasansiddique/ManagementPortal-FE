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
import ModalView from './Employees.modalForm.view';
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
  updateSingleEmployee,
}) => {
  const [visibleModalRegister, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [search, setSearch] = useState({ subString: '' });
  const [page, setPage] = useState({ current: 1 });
  const [id, setId] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const [imgData, setImgData] = useState(null);
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

  const [form] = Form.useForm();
  const { validateFields, resetFields, scrollToField } = form;

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

  const onFinish = (values) => {
    createEmployee(values, imgData);
  };

  const handleOkForRegistration = () => {
    validateFields()
      .then((values) => {
        resetFields();
        onFinish(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setImgPreview(null);
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleCancelForRegistration = () => {
    setImgPreview(null);
    setVisible(false);
  };

  const updateEmployee = (values) => {
    updateSingleEmployee(id, values, imgData);
  };

  const handleOkForUpdate = () => {
    validateFields()
      .then((values) => {
        resetFields();
        updateEmployee(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setId(undefined);
          setImgPreview(null);
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
    setVisibleUpdate(false);
  };

  const handleCancelForUpdate = () => {
    setVisibleUpdate(false);
    setImgPreview(null);
    setId(undefined);
  };

  const showModalForRegistration = () => {
    setVisible(true);
  };

  const showModalForUpdate = () => {
    setVisibleUpdate(true);
  };

  const onFinishFailed = ({ errorFields }) => {
    scrollToField(errorFields[0].name);
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

  const modalState = () => {
    const register = visibleModalRegister ? 'Employee Registration Form' : null;
    const update = visibleUpdate ? 'Employee Update Form' : null;
    const registerOk = visibleModalRegister ? handleOkForRegistration : null;
    const updateOk = visibleUpdate ? handleOkForUpdate : null;
    const registerOkText = visibleModalRegister ? 'Register' : null;
    const updateOkText = visibleUpdate ? 'Update' : null;
    const registerCancel = visibleModalRegister
      ? handleCancelForRegistration
      : null;
    const updateCancel = visibleUpdate ? handleCancelForUpdate : null;
    return {
      register,
      update,
      registerOk,
      updateOk,
      registerOkText,
      updateOkText,
      registerCancel,
      updateCancel,
    };
  };

  return (
    <Content>
      <Row>
        <Col span={10}>
          {typeOfId === USER_STATE.ADMIN_FULL ? (
            <Button type="primary" onClick={showModalForRegistration}>
              <UserAddOutlined />
              Add Employee
            </Button>
          ) : null}
          <ModalView
            modalState={modalState}
            visibleModalRegister={visibleModalRegister}
            visibleUpdate={visibleUpdate}
            confirmLoading={confirmLoading}
            form={form}
            updateEmployee={updateEmployee}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            setImgData={setImgData}
            setImgPreview={setImgPreview}
            imgPreview={imgPreview}
            id={id}
            employee={employee}
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
          showModalForUpdate={showModalForUpdate}
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
  updateSingleEmployee: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  employees: PropTypes.any.isRequired,
  employee: PropTypes.object,
  statusUpdate: PropTypes.string.isRequired,
};

export default EmployeesView;
