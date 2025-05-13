import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";

import { Breadcrumb, Layout, theme, Drawer, Button } from "antd";
import { Outlet } from "react-router-dom";
import IndexSideBar from "../pages/pannel/IndexSideBar";
import useAxios from "../utils/useAxios";
import User from "../pages/pannel/user";
import { userData } from "../store/context/userContext";

const { Content, Sider } = Layout;

const PannelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useAxios();

  const data = userData();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        className="hidden md:block"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
      >
        <User data={data.user} />
        <div className="demo-logo-vertical" />
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
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
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
