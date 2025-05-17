import api from "../utils/api";

const getAllUsers = (pageSize, pageIndex, search) => {
  return api.get("v1/User/GetAllByFilter", {
    params: {
      pageSize,
      pageIndex,
      search,
    },
  });
};

export default getAllUsers;
