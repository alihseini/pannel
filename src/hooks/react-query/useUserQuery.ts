import { useQuery } from "@tanstack/react-query";
import getAllUsers from "../../services/getAllUsers";

const useUsersQuery = (pageSize: number, pageIndex: number, search: string) => {
  return useQuery({
    queryKey: ["users", pageSize, pageIndex, search],
    queryFn: () => getAllUsers(pageSize, pageIndex, search),
    staleTime: 1000 * 60,
  });
};

export default useUsersQuery;
