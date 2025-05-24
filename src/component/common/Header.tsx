import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import React from "react";

const routeNameMap: Record<string, string> = {
  pannel: "پنل",
  users: "کاربران",
  newUser: "کاربر جدید",
  editUser: "ویرایش کاربر",
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
    <div className="w-full flex justify-between items-center border-b-1 border-gray-200 m-5">
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/">خانه</Link>
          </Breadcrumb.Item>
          {breadcrumbItems}
        </Breadcrumb>
      </div>
      <div className=" p-2 ml-5 border-1 border-gray-300 rounded-[10px] hover:border-black duration-300 cursor-pointer">
        <Link
          className="!text-black  flex items-center gap-2"
          to={button.buttonPath}
        >
          <i className="fal fa-angle-right"></i>
          {button.buttonName}
        </Link>
      </div>
    </div>
  );
};

export default Header;
