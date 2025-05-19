import { Form, Input, Radio, Upload, type UploadProps } from "antd";
import React from "react";
import Header from "../../component/common/Header";

const onFinish: FormProps["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const NewUser: React.FC = () => {
  return (
    <>
      <Header button={{ buttonName: "بازگشت", buttonPath: "/" }} />
      <div>
        <p className="mb-5">اطلاعات عمومی</p>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          layout="vertical"
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="grid grid-cols-4"
        >
          <Form.Item
            label="کدملی"
            name="nationalCode"
            rules={[
              { required: true, message: "لطفا کد ملی خود را وارد کنید!" },
            ]}
          >
            <Input type="number" count={{ show: true, max: 10 }} />
          </Form.Item>
          <Form.Item
            label="نام"
            name="firstName"
            rules={[{ required: true, message: "لطفا نام خود را وارد کنید!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="نام خانوادگی"
            name="lastName"
            rules={[
              {
                required: true,
                message: "لطفا نام خانوادگی خود را وارد کنید!",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="نام پدر"
            name="fatherName"
            rules={[
              { required: true, message: "لطفا نام پدر خود را وارد کنید!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="موبایل"
            name="mobile"
            rules={[
              {
                required: true,
                message: "لطفا شماره موبایل خود را وارد کنید!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="تاریخ تولد"
            name="birthDate"
            rules={[
              { required: true, message: "لطفا تاریخ تولد خود را وارد کنید!" },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              { required: true, message: "لطفا تاریخ تولد خود را وارد کنید!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="جنسیت"
            name="gender"
            rules={[
              { required: true, message: "لطفا تاریخ تولد خود را وارد کنید!" },
            ]}
          >
            <Radio.Group>
              <Radio value="0">مرد</Radio>
              <Radio value="1">زن</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">اطلاعات سامانه</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <Form.Item
            label="نوع کاربر"
            name="type"
            initialValue="0"
            rules={[{ required: true, message: "لطفا نوع وارد کنید!" }]}
          >
            <Radio.Group>
              <Radio value="0">شهروند</Radio>
              <Radio value="1">سازمانی</Radio>
              <Radio value="2">LDAP</Radio>
            </Radio.Group>
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">تصاویر</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <Form.Item
            label="تصویر کاربر"
            name="userImage"
            initialValue="0"
            rules={[
              { required: true, message: "لطفا تصویر خود را وارد کنید!" },
            ]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <i className="fal fa-cloud-upload text-4xl"></i>
              </p>
              <p className="ant-upload-text">
                به منظور بارگذاری کلیک یا فایل خود را در محدوده رها کنید
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item
            label="تصویر امضا"
            name="signImage"
            initialValue="0"
            rules={[
              { required: true, message: "لطفا تصویر خود را وارد کنید!" },
            ]}
          >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <i className="fal fa-cloud-upload text-4xl"></i>
              </p>
              <p className="ant-upload-text">
                به منظور بارگذاری کلیک یا فایل خود را در محدوده رها کنید
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default NewUser;
