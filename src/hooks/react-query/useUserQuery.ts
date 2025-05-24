import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/user";

const useUsersQuery = (pageSize, pageIndex, search) => {
  return useQuery({
    queryKey: ["users", pageSize, pageIndex, search],
    queryFn: () => getAllUsers(pageSize, pageIndex, search),
  });
};

export default useUsersQuery;
