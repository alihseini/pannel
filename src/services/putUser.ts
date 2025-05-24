import toast from "react-hot-toast";
import api from "../utils/api";

const putUser = async (user) => {
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const response = await api.put("/v1/User", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    toast("خطا در ارسال اطلاعات کاربر");
    throw error;
  }
};

export default putUser;
