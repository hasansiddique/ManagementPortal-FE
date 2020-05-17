import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { get } from 'lodash';
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  PlusOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  Upload,
} from 'antd';

import storage from '../../../../../common/storage';
import { USER_STATE } from '../../../../../common/constants';

const { Content } = Layout;
const { confirm } = Modal;
const { Option } = Select;
const { Text } = Typography;

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const EmployeesView = ({
  handleSubmit,
  handleFetching,
  employeeState,
  loading,
  Success,
  handleDeletion,
  deletion,
  getSingleEmployee,
  singleEmployeeState,
  updateSingleEmployee,
  onUpdate,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [visibleView, setVisibleView] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [search, setSearch] = useState({ words: '' });
  const [page, setPage] = useState({ current: 1 });
  const [id, setId] = useState('');
  const [imgPreview, setImgPreview] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [radioBtn, setRadioBtn] = useState('');

  const typeOfId = get(storage.get('user'), 'user.typeOfId');

  useEffect(() => {
    handleFetching();
  }, [handleFetching, Success, deletion, onUpdate]);

  useEffect(() => {
    if (id) {
      getSingleEmployee(id);
    }
  }, [getSingleEmployee, id]);

  let data = !loading && employeeState
    ? employeeState.employee.map((row, index) => ({
      Name: row.name.charAt(0).toUpperCase() + row.name.slice(1),
      Gender: row.gender.charAt(0).toUpperCase() + row.gender.slice(1),
      Photo: row.photo,
      Department: row.department,
      Designation: row.designation,
      joinDate: <Moment format="YYYY-MM-DD HH:mm">{row.joinDate}</Moment>,
      Sr: index,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
    }))
    : [];

  data = data.filter((item) => (radioBtn
    ? item.Department.includes(radioBtn)
    : item.Name.toLowerCase().includes(search.words.toLowerCase())));

  const empLength = !loading && employeeState ? employeeState.length : 0;
  const [form] = Form.useForm();
  const {
    validateFields, resetFields, setFieldsValue, scrollToField,
  } = form;

  // here i will add setTimeOut bcz it give console warning cannot update state
  // during another state transition so this function will run after 50 milliSeconds
  // that's why i add this so that first modal state will change after that these
  // values are render on update form

  setTimeout(() => {
    if (id && singleEmployeeState && singleEmployeeState.employee) {
      setFieldsValue({
        name: singleEmployeeState.employee.name,
        email: singleEmployeeState.employee.email,
        gender: singleEmployeeState.employee.gender,
        age: singleEmployeeState.employee.age,
        designation: singleEmployeeState.employee.designation,
        department: singleEmployeeState.employee.department,
        address: singleEmployeeState.employee.address,
      });
    } else {
      resetFields();
    }
  }, 50);

  const showDeleteConfirm = (itemId) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content:
        'After this operation user will successfully deleted from database',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeletion(itemId);
      },
    });
  };

  const onFinish = (values) => {
    handleSubmit(values, imgData);
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

  if (id === undefined) {
    setTimeout(() => {
      resetFields();
    }, 50);
  }

  const showModalForRegistration = () => {
    setVisible(true);
  };

  const showModalForUpdate = () => {
    setVisibleUpdate(true);
  };

  const onFinishFailed = ({ errorFields }) => {
    scrollToField(errorFields[0].name);
  };

  const showModalForViewEmployee = () => {
    setVisibleView(true);
  };

  const handleCancelForViewEmployee = () => {
    setVisibleView(false);
    setId(undefined);
  };

  // @Todo (Hanzlah)  working on image url to be served as static file

  const columns = [
    {
      title: 'Sr.',
      dataIndex: 'Sr',
      key: 'Sr',
    },
    {
      dataIndex: 'Photo',
      key: 'img',
      width: '50px',
      render: (record) => (
        <img
          alt="test"
          src={`http://localhost:8000/${record}`}
          height={60}
          width={70}
        />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <p
          onClick={() => {
            showModalForViewEmployee();
            setId(record.Id);
          }}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          {text}
        </p>
      ),
    },
    {
      title: 'Department',
      dataIndex: 'Department',
      key: 'Department',
    },
    {
      title: 'Designation',
      dataIndex: 'Designation',
      key: 'Designation',
    },
    {
      title: 'Gender',
      dataIndex: 'Gender',
      key: 'Gender',
    },
    {
      title: 'JoinDate',
      dataIndex: 'joinDate',
      key: 'JoinDate',
    },
    {
      title: 'Actions',
      key: 'Actions',
      render: (record) => (
        <span style={{ paddingLeft: '10px' }}>
          <FormOutlined
            style={{ color: 'green' }}
            onClick={() => {
              showModalForUpdate();
              setId(record.Id);
            }}
          />
          {typeOfId === USER_STATE.ADMIN_FULL ? (
            <DeleteOutlined
              style={{ color: 'red', paddingLeft: '15px' }}
              onClick={() => showDeleteConfirm(record.Id)}
            />
          ) : null}
        </span>
      ),
    },
  ];

  const handleSearch = (e) => {
    setSearch({ words: e.target.value });
    setPage({
      current: 1,
    });
  };

  const handleClick = () => {
    setRadioBtn('');
  };

  const onChange = (currentPage) => {
    setPage({
      current: currentPage,
    });
  };

  const showTotal = (total) => {
    return `Total ${total} employees`;
  };

  const handleChange = ({ fileList }) => {
    const file = fileList.slice(-1);
    const { type, size } = file[0].originFileObj;
    const isJpgOrPng = type === 'image/jpeg' || type === 'image/png' || type === 'image/jpg';
    const isLt2M = size / 1024 / 1024 <= 2;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    } else if (!isLt2M) {
      message.error('Image must be smaller than or equal to 2MB!');
    } else {
      setImgData(file[0].originFileObj);
      getBase64(file[0].originFileObj, (imageUrl) => setImgPreview(imageUrl));
    }
  };
  const uploadButton = (
    <div className="ant-upload-text">
      <PlusOutlined />
      Image
    </div>
  );

  const onRadioChange = (e) => setRadioBtn(e.target.value);

  const modalState = () => {
    const register = visible ? 'Employee Registration Form' : null;
    const update = visibleUpdate ? 'Employee Update Form' : null;
    const registerOk = visible ? handleOkForRegistration : null;
    const updateOk = visibleUpdate ? handleOkForUpdate : null;
    const registerOkText = visible ? 'Register' : null;
    const updateOkText = visibleUpdate ? 'Update' : null;
    const registerCancel = visible ? handleCancelForRegistration : null;
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

  const {
    register,
    update,
    registerOk,
    updateOk,
    registerOkText,
    updateOkText,
    registerCancel,
    updateCancel,
  } = modalState();

  return (
    <Content>
      <Row>
        <Col span={10}>
          <div>
            {typeOfId === USER_STATE.ADMIN_FULL ? (
              <Button type="primary" onClick={showModalForRegistration}>
                <UserAddOutlined />
                Add Employee
              </Button>
            ) : null}
            <Modal
              getContainer={false}
              title={register || update}
              visible={visible || visibleUpdate}
              onOk={registerOk || updateOk}
              okText={registerOkText || updateOkText}
              confirmLoading={confirmLoading}
              onCancel={registerCancel || updateCancel}
              maskClosable={false}
            >
              <Row>
                <Col span={10} />
                <Col span={14}>
                  <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleChange}
                  >
                    {imgPreview ? (
                      <img
                        src={imgPreview}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Col>
              </Row>

              <Form
                labelCol={layout.labelCol}
                wrapperCol={layout.wrapperCol}
                form={form}
                name="nest-messages"
                onFinish={visible ? onFinish : updateEmployee}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Please Input" />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    {
                      type: 'email',
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Please enter your email" />
                </Form.Item>
                <Form.Item
                  name="age"
                  label="Age"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber placeholder="age" />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select a gender" allowClear>
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="designation"
                  label="Designation"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Please enter your designation" />
                </Form.Item>
                <Form.Item
                  name="department"
                  label="Department"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="Select a department" allowClear>
                    <Option value="Front-End">Front-End</Option>
                    <Option value="Back-End">Back-End</Option>
                    <Option value="Dev-Ops">Dev-Ops</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input.TextArea placeholder="Please add address" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <Modal
            title="Viewing Employee"
            visible={visibleView}
            maskClosable={false}
            onCancel={handleCancelForViewEmployee}
            footer={null}
          >
            {!singleEmployeeState ? (
              <Spin tip="Loading..." />
            ) : (
              <div>
                <Text strong>Name: </Text>
                <Text>
                  {singleEmployeeState && singleEmployeeState.employee.name}
                </Text>
                <br />
                <Text strong>Age: </Text>
                <Text>
                  {singleEmployeeState && singleEmployeeState.employee.age}
                </Text>
                <br />
                <Text strong>Gender: </Text>
                <Text>
                  {singleEmployeeState && singleEmployeeState.employee.gender}
                </Text>
                <br />
                <Text strong>Email: </Text>
                <Text>
                  {singleEmployeeState && singleEmployeeState.employee.email}
                </Text>
                <br />
                <Text strong>JoinDate: </Text>
                <Text>
                  {singleEmployeeState
                    && singleEmployeeState.employee.joinDate.split('T')[0]}
                </Text>
                <br />
                <Text strong>Department: </Text>
                <Text>
                  {singleEmployeeState
                    && singleEmployeeState.employee.department}
                </Text>
                <br />
                <Text strong>Designation: </Text>
                <Text>
                  {singleEmployeeState
                    && singleEmployeeState.employee.designation}
                </Text>
                <br />
                <Text strong>Address: </Text>
                <Text>
                  {singleEmployeeState && singleEmployeeState.employee.address}
                </Text>
              </div>
            )}
          </Modal>
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
        <Table
          rowKey={(obj) => obj.Id}
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 4,
            current: page.current,
            onChange,
            total: { empLength },
            showTotal,
          }}
        />
      )}
    </Content>
  );
};

EmployeesView.defaultProps = {};

EmployeesView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleFetching: PropTypes.func.isRequired,
  handleDeletion: PropTypes.func.isRequired,
  getSingleEmployee: PropTypes.func.isRequired,
  updateSingleEmployee: PropTypes.func.isRequired,
  employeeState: PropTypes.object.isRequired,
  singleEmployeeState: PropTypes.string.isRequired,
  deletion: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  Success: PropTypes.bool.isRequired,
  onUpdate: PropTypes.bool.isRequired,
};

EmployeesView.styles = {};

export default EmployeesView;
