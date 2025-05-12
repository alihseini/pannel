import { Avatar } from "antd";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

const User: React.FC = ({ data }) => {
  console.log(data);
  return (
    <div>
      <div className="text-center">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={`data:image/png;base64,${data.avatarBase64}`}
        />
      </div>
      <p className="text-zinc-50 text-center">
        {data.firstName}
        {data.lastName}
      </p>
    </div>
  );
};

export default User;
