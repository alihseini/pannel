import React from 'react';
import { Button, Result } from 'antd';

const errorLayout: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Result
      status="404"
      title="404"
      subTitle="صفحه ی مورد نظر پیدا نشد"
      extra={<Button type="primary">بازگشت</Button>}
    />
  </div>
);

export default errorLayout
