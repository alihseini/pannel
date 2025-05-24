import React from "react";
import { Button, Popconfirm, message } from "antd";

const DeleteButton: React.FC<{ onConfirm: () => void }> = ({ onConfirm }) => {
  const confirm = () => {
    onConfirm();
    message.success("آیتم حذف شد");
  };

  return (
    <Popconfirm
      title="آیا مطمئن هستید که می‌خواهید حذف کنید؟"
      onConfirm={confirm}
      okText="بله"
      cancelText="خیر"
    >
      <i className="fal fa-trash cursor-pointer text-red-600"></i>
    </Popconfirm>
  );
};

export default DeleteButton;
