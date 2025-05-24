import api from "../utils/api";
import toast from "react-hot-toast";
import { getFormData } from "../utils/helper";

const getAllUsers = (pageSize, pageIndex, search) => {
  return new Promise((resolve, reject) => {
    api
      .get("v1/User/GetAllByFilter", {
        params: { pageSize, pageIndex, search },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "خطایی رخ داده است");
        reject(error);
      });
  });
};

const postNewUser = (user) => {
  return new Promise((resolve, reject) => {
    const formData = getFormData(user);
    api
      .post("/v1/User", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("کاربر با موفقیت اضافه شد!");
        resolve(response.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "خطایی رخ داده است");
        reject(error);
      });
  });
};

const getEditUser = (id) => {
  return new Promise((resolve, reject) => {
    api
      .get(`/v1/User/${id}`)
      .then((response) => {
        resolve(response.data.data);
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "خطایی رخ داده است");
        reject(error);
      });
  });
};

const putUser = (user) => {
  return new Promise((resolve, reject) => {
    const formData = getFormData(user);
    api
      .put("/v1/User", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        toast("خطا در ارسال اطلاعات کاربر");
        reject(error);
      });
  });
};

const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    api
      .delete("/v1/User", {
        data: { userId },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        toast.error("خطا در حذف کاربر!");
        reject(error);
      });
  });
};

export { getAllUsers, postNewUser, getEditUser, putUser, deleteUser };
