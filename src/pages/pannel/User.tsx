import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const User: React.FC = ({ data }) => {
  return (
    <div>
      <div className="text-center">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={`data:image/png;base64,${data.avatarBase64}`}
        />
      </div>
      <p className=" text-center">
        {data.firstName}
        {data.lastName}
      </p>
      <div className="flex w-full justify-center gap-5 my-3 text-2xl">
        <i class="fal fa-square"></i>
        <i class="fal fa-house"></i>
        <i class="fal fa-right-from-bracket text-red-600"></i>
      </div>
    </div>
  );
};

export default User;
