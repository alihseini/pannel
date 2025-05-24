import toast from "react-hot-toast";
import api from "../utils/api";

const postNewUser = async (user) => {
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });

  try {
    const response = await api.post("/v1/User", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("کاربر با موفقیت اضافه شد!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export default postNewUser;
