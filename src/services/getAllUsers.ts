import api from "../utils/api";

const getAllUsers = (pageSize, pageIndex) => {
  return new Promise((resolve, reject) => {
    api
      .get("v1/User/GetAllByFilter", {
        params: {
          pageSize,
          pageIndex,
        },
      })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};

export default getAllUsers;
