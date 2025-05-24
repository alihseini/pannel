import toast from "react-hot-toast";
import api from "../utils/api";

const deleteUser = async (userId) => {
  try {
    const response = await api.delete("/v1/User", {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    toast.error("خطا در حذف کاربر!");
    throw error;
  }
};

export default deleteUser;
