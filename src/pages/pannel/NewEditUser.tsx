import { Button, Form, Input, Radio, Switch, TimePicker, Upload } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../../component/common/Header";
import Dragger from "antd/es/upload/Dragger";
import postNewUser from "../../services/postNewUser";
import { useNavigate, useParams } from "react-router-dom";
import getEditUser from "../../services/getEditUser";
import putUser from "../../services/putUser";
import GuideDrawer from "../../component/common/GuideDrawer";

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
  const [enabled, setEnabled] = useState(false);
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      const getData = async () => {
        const data = await getEditUser(id);
        form.setFieldsValue(data);
      };
      getData();
    }
  }, [id]);

  const onFinish = async (values) => {
    let birthDateIso = null;
    if (values.BirthDate) {
      const parsedDate = new Date(values.birthDate);
      if (!isNaN(parsedDate.getTime())) {
        birthDateIso = parsedDate.toISOString();
      } else {
        message.error("تاریخ تولد نامعتبر است!");
        return;
      }
    }

    const user = {
      ...values,
      BirthDate: birthDateIso,
    };
    if (id) {
      await putUser({ ...user, id });
    } else {
      await postNewUser(user);
    }
    navigate("/pannel/users");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const cancelHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <Header button={{ buttonName: "بازگشت", buttonPath: "/" }} />
      <div>
        <p className="mb-5">اطلاعات عمومی</p>
        <Form
          name="basic"
          form={form}
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
            name="nationalCode"
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
              disabled={!!id}
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
          <Form.Item label="تاریخ تولد" name="birthDate">
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="ایمیل"
            name="email"
            rules={[
              { required: true, message: "لطفا ایمیل خود را وارد کنید!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="جنسیت"
            name="gender"
            rules={[
              { required: true, message: "لطفا جنسیت خود را وارد کنید!" },
            ]}
          >
            <Radio.Group
              options={[
                { value: 0, label: "مرد" },
                { value: 1, label: "زن" },
              ]}
            ></Radio.Group>
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">اطلاعات سامانه</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <div>
            <Form.Item label="وضعیت" name="status">
              <Radio.Group
                options={[
                  { value: 0, label: "غیرفعال" },
                  { value: 1, label: "فعال" },
                ]}
              ></Radio.Group>
            </Form.Item>
            <Form.Item
              label="نام کاربری"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "لطفا نام کاربری خود را وارد کنید!",
                },
              ]}
            >
              <Input disabled={!!id} />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="ورود دو مرحله" name="twoFactorEnabled">
              <Radio.Group
                options={[
                  { value: false, label: "غیرفعال" },
                  { value: true, label: "فعال" },
                ]}
              ></Radio.Group>
            </Form.Item>
            <Form.Item label="استعلام ثبت احوال">
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="دسترسی به وب" name="smsWebServiceAccess">
              <Radio.Group
                options={[
                  { value: false, label: "ندارد" },
                  { value: true, label: "دارد" },
                ]}
              ></Radio.Group>
            </Form.Item>
            <Form.Item label="استعلام شاهکار ">
              <Input disabled />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="نوع کاربر" name="type" initialValue="0">
              <Radio.Group
                options={[
                  { value: 0, label: "شهروند" },
                  { value: 1, label: "سازمانی" },
                  { value: 2, label: "LDPA" },
                ]}
              ></Radio.Group>
            </Form.Item>
            {!id && (
              <Form.Item
                label="رمز عبور"
                className="!mt-8"
                name="password"
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
            )}
          </div>
          {!id && (
            <Form.Item
              label="تکرار رمز عبور"
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "لطفا تکرار رمز عبور را وارد کنید!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("رمز عبور با تکرار آن مطابقت ندارد!");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="تکرار رمز عبور" />
            </Form.Item>
          )}
          <div className="col-span-3"></div>
          <Form.Item
            label="تعیین نوع ساعات محدودیت ورود"
            className="mb-0 col-span-4"
          >
            <Switch
              checked={enabled}
              onChange={setEnabled}
              checkedChildren="مجاز به ورود در ساعت معین"
              unCheckedChildren="عدم مجاز به ورود در ساعت معین"
              style={{ minWidth: 180 }}
            />
          </Form.Item>
          <Form.Item
            label={enabled ? "ساعت مجاز آغاز ورود" : "ساعت غیرمجاز آغاز ورود"}
            className="flex-1"
          >
            <TimePicker
              disabled={!enabled}
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                padding: "8px",
              }}
            />
          </Form.Item>
          <Form.Item
            label={enabled ? "ساعت مجاز آغاز ورود" : "ساعت غیرمجاز آغاز ورود"}
            className="flex-1"
          >
            <TimePicker
              disabled={!enabled}
              style={{
                width: "100%",
                backgroundColor: "#fafafa",
                padding: "8px",
              }}
            />
          </Form.Item>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">اطلاعات سازمانی</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <div className="my-7">
            <span>سمت ها</span>
            <GuideDrawer />
          </div>
          <div className="flex items-center gap-3 col-span-4">
            <h2 className="text-xl">تصاویر</h2>
            <div className="bg-gray-200 h-[1px] grow"></div>
          </div>
          <Form.Item
            label="تصویر کاربر"
            name="avatarFile"
            className="col-span-2"
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
          <Form.Item
            label="تصویر امضا"
            // name="avatarFile"
            className="col-span-2"
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
          <div className="flex w-full ">
            <Button onClick={cancelHandler}>انصراف</Button>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                تایید
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewEditUser;
