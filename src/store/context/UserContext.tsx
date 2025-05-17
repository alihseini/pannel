import React, { createContext, useContext } from "react";
import getCurrentUser from "../../services/getCurrentUser";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (isLoading) return <div>در حال بارگذاری اطلاعات کاربر...</div>;
  if (error) return <div>خطا در دریافت اطلاعات کاربر</div>;

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

const useUserData = () => {
  return useContext(UserContext);
};

export default UserProvider;
export { useUserData };
