import React from 'react';
import { Button, Result } from 'antd';

const Error500: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="مشکل!"
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default Error500;