import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../serves/APIAuth";

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser(),
    initialData: getCurrentUser(),
    staleTime: Infinity,
  });

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
  };
}
