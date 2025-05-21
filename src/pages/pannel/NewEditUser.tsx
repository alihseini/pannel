import { Button, Form, Input, Radio, Upload } from "antd";
import React from "react";
import Header from "../../component/common/Header";
import Dragger from "antd/es/upload/Dragger";
import postNewUser from "../../services/postNewUser";
import CustomDrawer from "../../component/common/CustomDrawer";
import { useNavigate } from "react-router-dom";

const props = {
  name: "file",
  multiple: false,
  accept: ".png,.jpg,.jpeg",
  beforeUpload: (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("فقط فرمت PNG یا JPEG قابل قبول است!");
      return Upload.LIST_IGNORE;
    }

    const isLt374KB = file.size / 1024 <= 374;
    if (!isLt374KB) {
      message.error("حجم تصویر نباید بیشتر از ۳۷۴ کیلوبایت باشد!");
      return Upload.LIST_IGNORE;
    }

    return true;
  },
  // optional: show uploaded file
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} با موفقیت بارگذاری شد`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} در بارگذاری با خطا مواجه شد`);
    }
  },
};

const NewEditUser: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    let BirthDateIso = null;
    if (values.BirthDate) {
      const parsedDate = new Date(values.BirthDate);
      if (!isNaN(parsedDate.getTime())) {
        BirthDateIso = parsedDate.toISOString();
      } else {
        message.error("تاریخ تولد نامعتبر است!");
        return;
      }
    }

    const User = {
      ...values,
      BirthDate: BirthDateIso,
    };
    console.log(values);
    await postNewUser(User);
    navigate("/pannel/users");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
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
            label="کد ملی"
            name="NationalCode"
            rules={[
              {
                required: true,
                message: "لطفا کد ملی خود را وارد کنید!",
              },
              {
                pattern: /^\d{10}$/,
                message: "کد ملی باید فقط شامل 10 رقم باشد.",
              },
            ]}
          >
            <Input
              maxLength={10}
              count={{ show: true, max: 10 }}
              placeholder="مثال: 0012345678"
              inputMode="numeric"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label="نام"
            name="FirstName"
            rules={[{ required: true, message: "لطفا نام خود را وارد کنید!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="نام خانوادگی"
            name="LastName"
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
            name="FatherName"
            rules={[
              { required: true, message: "لطفا نام پدر خود را وارد کنید!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="موبایل"
            name="Mobile"
            rules={[
              {
                required: true,
                message: "لطفا شماره موبایل خود را وارد کنید!",
              },
              {
                pattern: /^09\d{9}$/,
                message: "شماره موبایل باید با 09 شروع شده و 11 رقم باشد.",
              },
            ]}
          >
            <Input
              maxLength={11}
              placeholder="مثال: 09123456789"
              inputMode="numeric"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item label="تاریخ تولد" name="BirthDate">
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="ایمیل"
            name="Email"
            rules={[
              { required: true, message: "لطفا ایمیل خود را وارد کنید!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="جنسیت"
            name="Gender"
            rules={[
              { required: true, message: "لطفا جنسیت خود را وارد کنید!" },
            ]}
          >
            <Radio.Group
              options={[
                { value: 0, label: "مرد" },
                { value: 1, label: "زن" },
              ]}
              defaultValue={0}
            ></Radio.Group>
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">اطلاعات سامانه</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <div>
            <Form.Item label="وضعیت" name="Status">
              <Radio.Group
                options={[
                  { value: 0, label: "غیرفعال" },
                  { value: 1, label: "فعال" },
                ]}
                defaultValue={1}
              ></Radio.Group>
            </Form.Item>
            <Form.Item
              label="نام کاربری"
              name="UserName"
              rules={[
                {
                  required: true,
                  message: "لطفا نام کاربری خود را وارد کنید!",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="ورود دو مرحله" name="TwoFactorEnabled">
              <Radio.Group
                options={[
                  { value: 0, label: "غیرفعال" },
                  { value: 1, label: "فعال" },
                ]}
                defaultValue={0}
              ></Radio.Group>
            </Form.Item>
            <Form.Item label="استعلام ثبت احوال" name="UserName">
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="دسترسی به وب" name="TwoFactorEnabled">
              <Radio.Group
                options={[
                  { value: 0, label: "ندارد" },
                  { value: 1, label: "دارد" },
                ]}
                defaultValue={0}
              ></Radio.Group>
            </Form.Item>
            <Form.Item label="استعلام شاهکار " name="UserName">
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="نوع کاربر" name="Type" initialValue="0">
              <Radio.Group
                options={[
                  { value: 0, label: "شهروند" },
                  { value: 1, label: "سازمانی" },
                  { value: 2, label: "LDPA" },
                ]}
                defaultValue={1}
              ></Radio.Group>
              <Form.Item
                label="رمز عبور"
                className="!mt-8"
                name="Password"
                rules={[
                  {
                    required: true,
                    message: "لطفا رمز عبور را وارد کنید!",
                  },
                  {
                    pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!]).{8,}$/,
                    message:
                      "رمز عبور باید حداقل ۸ کاراکتر، شامل حروف بزرگ، کوچک، عدد و یک کاراکتر خاص باشد.",
                  },
                ]}
              >
                <Input.Password placeholder="مثال: MyPass@123" />
              </Form.Item>
            </Form.Item>
          </div>
          <Form.Item
            label="تکرار رمز عبور"
            name="ConfirmPassword"
            dependencies={["Password"]}
            rules={[
              {
                required: true,
                message: "لطفا تکرار رمز عبور را وارد کنید!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("Password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("رمز عبور با تکرار آن مطابقت ندارد!");
                },
              }),
            ]}
          >
            <Input.Password placeholder="تکرار رمز عبور" />
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">اطلاعات سازمانی</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <div className="my-7">
            <span>سمت ها</span>
            <CustomDrawer title={"راهنما"} />
          </div>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">تصاویر</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <Form.Item
            label="تصویر کاربر"
            name="AvatarFile"
            initialValue="0"
            className="col-span-4"
            rules={[
              { required: true, message: "لطفا تصویر خود را وارد کنید!" },
            ]}
          >
            <Dragger {...props} className="w-full">
              <p className="ant-upload-drag-icon">
                <i className="fal fa-cloud-upload text-4xl"></i>
              </p>
              <p className="ant-upload-text">
                برای بارگذاری، کلیک کنید یا تصویر خود را در اینجا رها کنید
              </p>
              <p className="ant-upload-hint text-sm text-gray-500">
                فقط تصاویر PNG یا JPEG با حداکثر حجم ۳۷۴ کیلوبایت مجاز هستند.
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              تایید
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default NewEditUser;
