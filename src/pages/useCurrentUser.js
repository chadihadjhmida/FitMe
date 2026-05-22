import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery(["user"], {
    // initial data is already in cache, no need to fetch
    initialData: () => null,
    staleTime: Infinity, // user stays "fresh" until explicitly changed
  });
}
