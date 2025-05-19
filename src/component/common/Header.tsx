import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const routeNameMap: Record<string, string> = {
  pannel: "پنل",
  users: "کاربران",
  newUser: "کاربر جدید",
};

const Header: React.FC = ({ button }) => {
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
    <div className="w-full flex justify-between items-center">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">خانه</Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
      </Breadcrumb>
      <Link to={button.buttonPath}>{button.buttonName}</Link>
    </div>
  );
};

export default Header;
