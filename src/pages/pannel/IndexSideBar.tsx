import React from "react";
import { Menu, type MenuProps } from "antd";
import { PieChartOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  getItem("کاربران", "users", <PieChartOutlined />),
  getItem("تست", "test", <PieChartOutlined />),
];

const IndexSideBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const clickHandler: MenuProps["onClick"] = (e) => {
    navigate(`/pannel/${e.key}`);
  };

  // گرفتن بخش سوم مسیر برای انتخاب صحیح منو
  const currentPath = location.pathname.split("/")[2] || "users";

  return (
    <Menu
      theme="light"
      selectedKeys={[currentPath]}
      mode="inline"
      items={items}
      onClick={clickHandler}
    />
  );
};

export default IndexSideBar;
