import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const routeNameMap: Record<string, string> = {
  pannel: "پنل",
  users: "کاربران",
  newUser: "کاربر جدید",
};

const Header: React.FC = ({ button, title }) => {
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    const key = pathSnippets[index];
    const name = routeNameMap[key] || decodeURIComponent(key);

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{name}</Link>
      </Breadcrumb.Item>
    );
  });
  return (
    <div className="w-full flex justify-between items-center border-b-1 border-gray-200 mx-5">
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">خانه</Link>
          </Breadcrumb.Item>
          {breadcrumbItems}
        </Breadcrumb>
      </div>
      <div className="bg-blue-600 p-2 ml-5 rounded-xl hover:bg-blue-300 duration-300 cursor-pointer">
        <Link className="!text-white" to={button.buttonPath}>
          {button.buttonName}
        </Link>
      </div>
    </div>
  );
};

export default Header;
