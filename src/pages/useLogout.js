import { useQueryClient } from "@tanstack/react-query";

export function useLogout() {
  const queryClient = useQueryClient();

  function logout() {
    localStorage.removeItem("user");
    queryClient.setQueryData(["user"], null);
  }

  return { logout };
}
