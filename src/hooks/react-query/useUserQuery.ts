import { useQuery } from "@tanstack/react-query";
import getAllUsers from "../../services/getAllUsers";

const useUsersQuery = (pageSize, pageIndex, search, filters) => {
  return useQuery({
    queryKey: ["users", pageSize, pageIndex, search, JSON.stringify(filters)],
    queryFn: () => getAllUsers(pageSize, pageIndex, search, filters),
    staleTime: 1000 * 60,
  });
};

export default useUsersQuery;
