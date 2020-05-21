import React from 'react';
import PropsTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { get } from 'lodash';
import { Avatar } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';
import Moment from 'react-moment';

import { USER_STATE } from '../../../../../../common/constants';
import storage from '../../../../../../common/storage';
import List from '../employees.list.view';

const TableHeader = ({
  employees,
  loading,
  showDeleteConfirm,
  showModalForUpdate,
  setId,
  search,
  page,
  radioButton,
  setPage,
}) => {
  let data = !loading && employees
    ? employees.employee.map((row, index) => ({
      Name: row.name.charAt(0).toUpperCase() + row.name.slice(1),
      Gender: row.gender.charAt(0).toUpperCase() + row.gender.slice(1),
      Photo: row.photo,
      Department: row.department,
      Designation: row.designation,
      joinDate: <Moment format="YYYY-MM-DD HH:mm">{row.joinDate}</Moment>,
      Sr: index + 1,
      // eslint-disable-next-line no-underscore-dangle
      Id: row._id,
    }))
    : [];

  data = data.filter((item) => (radioButton
    ? item.Department.includes(radioButton)
    : item.Name.toLowerCase().includes(search.subString.toLowerCase())));

  const empLength = !loading && employees ? employees.length : 0;
  const typeOfId = get(storage.get('user'), 'user.typeOfId');

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
        <Avatar size="large" src={`http://localhost:8000/${record}`} />
      ),
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
      render: (text, record) => (
        <Link to={`/dashboard/admin/employee/${record.Id}`}>{text}</Link>
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
      title: 'Join Date',
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
  return (
    <List columns={columns} data={data} empLength={empLength} page={page} setPage={setPage} />
  );
};

TableHeader.propTypes = {
  loading: PropsTypes.bool.isRequired,
  employees: PropsTypes.object.isRequired,
  showDeleteConfirm: PropsTypes.func.isRequired,
  showModalForUpdate: PropsTypes.func.isRequired,
  setId: PropsTypes.func.isRequired,
  search: PropsTypes.object.isRequired,
  page: PropsTypes.object.isRequired,
  setPage: PropsTypes.func.isRequired,
  radioButton: PropsTypes.string.isRequired,
};

export default TableHeader;
