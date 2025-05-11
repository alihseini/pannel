import React from "react";
import { Button, Result } from "antd";

const error: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="صفحه ی مورد نظر پیدا نشد"
    extra={<Button type="primary">بازگشت</Button>}
  />
);

export default error;
