import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../serves/ApiOrder";

export function useOrder(id) {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", id], // add id to key so queries are unique per user
    queryFn: () => getOrder(id),
    initialData: [],
    enabled: !!id,
    staleTime: 0,
  });

  return {
    orders,
    isLoading,
  };
}
