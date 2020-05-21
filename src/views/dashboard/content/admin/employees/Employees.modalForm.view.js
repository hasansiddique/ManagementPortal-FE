import React from 'react';
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
  modalState,
  visibleModalRegister,
  visibleUpdate,
  confirmLoading,
  onFinish,
  updateEmployee,
  form,
  onFinishFailed,
  setImgData,
  setImgPreview,
  imgPreview,
  id,
  employee,
}) => {
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

  setTimeout(() => {
    if (id && employee && employee.employee) {
      form.setFieldsValue({
        name: employee.employee.name,
        email: employee.employee.email,
        gender: employee.employee.gender,
        age: employee.employee.age,
        designation: employee.employee.designation,
        department: employee.employee.department,
        address: employee.employee.address,
      });
    } else {
      form.resetFields();
    }
  }, 25);

  if (id === undefined) {
    setTimeout(() => {
      form.resetFields();
    }, 25);
  }

  return (
    <Modal
      getContainer={false}
      title={register || update}
      visible={visibleModalRegister || visibleUpdate}
      onOk={registerOk || updateOk}
      okText={registerOkText || updateOkText}
      confirmLoading={confirmLoading}
      onCancel={registerCancel || updateCancel}
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
        onFinish={visibleModalRegister ? onFinish : updateEmployee}
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
  imgPreview: null,
  employee: null,
  id: '',
};

ModalView.propTypes = {
  modalState: PropsTypes.func.isRequired,
  visibleModalRegister: PropsTypes.bool.isRequired,
  visibleUpdate: PropsTypes.bool.isRequired,
  confirmLoading: PropsTypes.bool.isRequired,
  onFinish: PropsTypes.func.isRequired,
  updateEmployee: PropsTypes.func.isRequired,
  onFinishFailed: PropsTypes.func.isRequired,
  form: PropsTypes.object.isRequired,
  setImgData: PropsTypes.any.isRequired,
  setImgPreview: PropsTypes.any.isRequired,
  imgPreview: PropsTypes.string,
  id: PropsTypes.string,
  employee: PropsTypes.object,
};

export default ModalView;
