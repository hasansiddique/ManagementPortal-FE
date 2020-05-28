import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function Error401() {
  return (
    <div className="center-block">
      <Result
        status="403"
        title="Unauthorized"
        subTitle="Sorry, you are not authorized to access this page."
        extra={(
          <Link to="/">
            <ArrowLeftOutlined />
            {' '}
            Back to Home
          </Link>
        )}
      />
    </div>
  );
}
