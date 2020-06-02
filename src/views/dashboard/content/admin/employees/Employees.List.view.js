import React from 'react';
import PropsTypes from 'prop-types';

import { Table } from 'antd';


const List = ({
  columns, empLength, data, page, setPage,
}) => {
  const showTotal = (total) => {
    return `Total ${total} employees`;
  };

  const onChange = (currentPage) => {
    setPage({
      current: currentPage,
    });
  };

  return (
    <Table
      rowKey={(obj) => obj.Id}
      columns={columns}
      dataSource={data}
      pagination={{
        defaultPageSize: 10,
        current: page.current,
        onChange,
        total: { empLength },
        showTotal,
      }}
    />
  );
};

List.propTypes = {
  columns: PropsTypes.array.isRequired,
  data: PropsTypes.array.isRequired,
  empLength: PropsTypes.number.isRequired,
  page: PropsTypes.object.isRequired,
  setPage: PropsTypes.func.isRequired,

};

export default List;
