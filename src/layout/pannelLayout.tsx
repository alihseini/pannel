import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Drawer, Button } from "antd";
import { Outlet, useLocation, Link } from "react-router-dom";
import IndexSideBar from "../pages/pannel/IndexSideBar";
import User from "../pages/pannel/User";
import { useUserData } from "../store/context/UserContext";

const { Content, Sider } = Layout;

const routeNameMap: Record<string, string> = {
  pannel: "پنل",
  users: "کاربران",
};

const PannelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const data = useUserData();
  const location = useLocation();

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="hidden md:block"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
        theme="light"
      >
        <User data={data.user.data.data} />
        <IndexSideBar />
      </Sider>

      <Layout>
        <Drawer
          title="Menu"
          placement="right"
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          className="md:hidden"
          bodyStyle={{ padding: 0 }}
        >
          <IndexSideBar />
        </Drawer>

        <Content style={{ margin: "0 16px" }}>
          <div className="flex gap-1.5 items-center">
            <div className="md:hidden">
              <Button
                icon={<UserOutlined />}
                onClick={() => setOpenDrawer(true)}
              />
            </div>

            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>
                <Link to="/">خانه</Link>
              </Breadcrumb.Item>
              {breadcrumbItems}
            </Breadcrumb>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              backgroundColor: "white",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PannelLayout;
