import api from "../utils/api";

const deleteUser = async (userId) => {
  try {
    const response = await api.delete("/v1/User", {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("خطا در حذف کاربر:", error);
    throw error;
  }
};

export default deleteUser;
