import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as logingApi } from "../serves/APIAuth.js";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export function useLognig() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { mutate: logning, isLoading } = useMutation({
    mutationFn: logingApi,
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"], user);
      toast.success(`Welcome back ${user.fullname}!`);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    },
  });
  return { logning, isLoading };
}
