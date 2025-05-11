import React from "react";
import { Button, Result } from "antd";

const error: React.FC = () => (
  <Result
    status="403"
    title="403"
    subTitle="دسترسی به این صفحه مجاز نیست"
    extra={<Button type="primary">بازگشت</Button>}
  />
);

export default error;
