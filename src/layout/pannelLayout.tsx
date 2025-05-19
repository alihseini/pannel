import React, { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {  Layout, Drawer, Button } from "antd";
import { Outlet } from "react-router-dom";
import IndexSideBar from "../pages/pannel/IndexSideBar";
import User from "../pages/pannel/User";
import { useUserData } from "../store/context/UserContext";

const { Content, Sider } = Layout;

const PannelLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const data = useUserData();

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
