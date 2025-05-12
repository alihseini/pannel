import api from "../utils/api";

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/v1/User/GetCurrentUser")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default getCurrentUser;
