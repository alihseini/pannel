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
    return response.data;
  } catch (error) {
    console.error("خطا در ارسال اطلاعات کاربر:", error);
    throw error;
  }
};

export default postNewUser;
