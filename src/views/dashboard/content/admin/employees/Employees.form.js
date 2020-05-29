import React, { useState } from 'react';
import PropsTypes from 'prop-types';

import {
  Col, Form, Input, InputNumber, Modal, Row, Select,
} from 'antd';

import ImageHandle from './views/imageHandle';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

const ModalView = ({
  visibleAdd,
  setVisibleAdd,
  visibleUpdate,
  setVisibleUpdate,
  createEmployee,
  updateEmployee,
  employee,
  id,
  setId,
}) => {
  const [imgData, setImgData] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);

  const [form] = Form.useForm();
  const {
    validateFields, resetFields, setFieldsValue, scrollToField,
  } = form;

  const onAddSuccessClick = (values) => {
    createEmployee(values, imgData);
  };

  const onUpdateSuccessClick = (values) => {
    updateEmployee(id, values, imgData);
  };

  const handleSubmitAdd = () => {
    validateFields()
      .then((values) => {
        resetFields();
        onAddSuccessClick(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setVisibleAdd(false);
          setImgPreview(null);
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleSubmitUpdate = () => {
    validateFields()
      .then((values) => {
        resetFields();
        onUpdateSuccessClick(values);
      })
      .then(() => {
        setConfirmLoading(true);
        setTimeout(() => {
          setVisibleUpdate(false);
          setId(undefined);
          setImgPreview(null);
          setConfirmLoading(false);
        }, 1000);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  const handleCancelAdd = () => {
    setImgPreview(null);
    setVisibleAdd(false);
  };

  const handleCancelUpdate = () => {
    setVisibleUpdate(false);
    setImgPreview(null);
    setId(undefined);
  };

  setTimeout(() => {
    if (id && employee && employee.employee) {
      setFieldsValue({
        name: employee.employee.name,
        email: employee.employee.email,
        gender: employee.employee.gender,
        age: employee.employee.age,
        designation: employee.employee.designation,
        department: employee.employee.department,
        address: employee.employee.address,
      });
    } else {
      resetFields();
    }
  }, 25);

  if (id === undefined) {
    setTimeout(() => {
      resetFields();
    }, 25);
  }

  const onFinishFailed = ({ errorFields }) => {
    scrollToField(errorFields[0].name);
  };

  return (
    <Modal
      getContainer={false}
      title={visibleUpdate ? 'Update Employee Form' : 'Add Employee Form'}
      visible={visibleAdd || visibleUpdate}
      onOk={visibleUpdate ? handleSubmitUpdate : handleSubmitAdd}
      okText={visibleUpdate ? 'Update' : 'Add'}
      confirmLoading={confirmLoading}
      onCancel={visibleUpdate ? handleCancelUpdate : handleCancelAdd}
      maskClosable={false}
    >
      <Row>
        <Col span={10} />
        <Col span={14}>
          <ImageHandle
            setImgData={setImgData}
            imgPreview={imgPreview}
            setImgPreview={setImgPreview}
          />
        </Col>
      </Row>
      <Form
        labelCol={layout.labelCol}
        wrapperCol={layout.wrapperCol}
        form={form}
        name="nest-messages"
        onFinish={visibleUpdate ? onUpdateSuccessClick : onAddSuccessClick}
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
  );
};

ModalView.defaultProps = {
  employee: null,
  id: '',
};

ModalView.propTypes = {
  createEmployee: PropsTypes.func.isRequired,
  visibleAdd: PropsTypes.bool.isRequired,
  setVisibleAdd: PropsTypes.func.isRequired,
  visibleUpdate: PropsTypes.bool.isRequired,
  setVisibleUpdate: PropsTypes.func.isRequired,
  updateEmployee: PropsTypes.func.isRequired,
  id: PropsTypes.string,
  setId: PropsTypes.func.isRequired,
  employee: PropsTypes.object,
};

export default ModalView;
