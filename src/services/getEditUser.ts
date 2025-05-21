import api from "../utils/api";

const getEditUser = async (id) => {
  const response = await api.get(`/v1/User/${id}`);
  return response.data.data;
};

export default getEditUser;
