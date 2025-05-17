import api from "../utils/api";

const getCurrentUser = async () => {
  const response = await api.get("/v1/User/GetCurrentUser");
  return response;
};

export default getCurrentUser;
