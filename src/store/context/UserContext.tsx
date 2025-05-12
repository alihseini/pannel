import React, { createContext, useContext, useEffect, useState } from "react";
import getCurrentUser from "../../services/getCurrentUser";

const UserContext = createContext();

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
      getCurrentUser()
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error));

  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const userData = () => {
  return useContext(UserContext);
};

export default UserProvider;
export { userData };
