import api from "../utils/api";

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    api
      .get("v1/User/GetAllByFilter")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getAllUsers;