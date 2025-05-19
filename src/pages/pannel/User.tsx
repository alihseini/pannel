import { Avatar } from "antd";
import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

interface Props {
  data: {
    avatarBase64: string;
    firstName: string;
    lastName: string;
  };
}

const User: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-5">
      <div className="text-center">
        <Avatar
          size={64}
          icon={<UserOutlined />}
          src={`data:image/png;base64,${data.avatarBase64}`}
        />
      </div>
      <p className="text-center">
        {data.firstName} {data.lastName}
      </p>

      {/* حالت md و بالاتر: آیکون‌ها به‌صورت عادی */}
      <div className="hidden lg:flex w-full justify-center gap-5 my-3 text-2xl items-center">
        <i className="fal fa-square-dashed hover:cursor-pointer"></i>
        <i className="fal fa-house hover:cursor-pointer"></i>
        <i className="fal fa-left-to-bracket text-red-600 hover:cursor-pointer"></i>
      </div>

      {/* حالت md پایین‌تر: منوی پاپ‌آپ بازشون نشون میده */}
      <div className="flex lg:hidden w-full justify-center my-3 text-2xl items-center">
        <div className="relative">
          <i
            className="fal fa-bars hover:cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          />

          {isOpen && (
            <div className="absolute top-full mt-2 right-1/2 translate-x-1/2 w-40 rounded-xl shadow-lg bg-white border z-50">
              <ul className="flex flex-col p-2 gap-2 text-xl text-gray-700">
                <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                  <i className="fal fa-square-dashed" /> گزینه ۱
                </li>
                <li className="flex items-center gap-2 hover:text-blue-500 cursor-pointer">
                  <i className="fal fa-house" /> خانه
                </li>
                <li className="flex items-center gap-2 text-red-600 hover:text-red-800 cursor-pointer">
                  <i className="fal fa-left-to-bracket" /> خروج
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
