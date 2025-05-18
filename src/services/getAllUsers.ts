import api from "../utils/api";

const getAllUsers = (pageSize, pageIndex, search, filters) => {
  return api.get("v1/User/GetAllByFilter", {
    params: {
      pageSize,
      pageIndex,
      search,
      ...filters,
    },
  });
};

export default getAllUsers;
