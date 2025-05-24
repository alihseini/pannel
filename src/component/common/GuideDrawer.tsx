import React, { useState } from "react";
import { Button, Drawer } from "antd";

const GuideDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        className="!bg-[#08919a] !text-white !py-0.5 !px-1 !text-[0.8rem]"
        onClick={showDrawer}
      >
        راهنما
      </Button>
      <Drawer
        title={"راهنما"}
        closable={{ "aria-label": "Close Button" }}
        className="text-[1rem]"
        onClose={onClose}
        open={open}
        placement="left"
      >
        <p className="m-5">
          - منظور از سمت، موقعیت کاربر در چارت سازمانی مورد نظر است مانند
          مدیرکل، مدیر عامل، کارشناس، معاون مالی و ....
        </p>
        <p className="m-5">- سمت‌ها در بخش مدیریت درختواره قابل تعریف و ویرایش هستند</p>
        <p>
          - با تعیین سمت کاربر می‌توانید موقعیت کاربر در گراف و درخت سازمانی را
          مشاهده کنید
        </p>
        <p className="m-5">
          - با ثبت سمت می‌توانید از ویژگی دسترسی به سامانه با استفاده از سمت را
          استفاده کنید
        </p>
        <p className="m-5">
          - در قسمت مدیریت سمت‌ها نیز می‌توانید کاربر مورد نظر را به سمت دلخواه
          خود متصل کنید
        </p>
      </Drawer>
    </>
  );
};

export default GuideDrawer;
