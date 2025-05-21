import React, { useState } from "react";
import { Button, Drawer } from "antd";

const CustomDrawer: React.FC = ({ title }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        {title}
      </Button>
      <Drawer
        title="Basic Drawer"
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        placement="left"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
