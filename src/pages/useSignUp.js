import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../serves/APIAuth.js";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      queryClient.setQueryData(["user"], user);
      toast.success("Account successfully created!");
      navigate(location.state?.from?.pathname || "/", { replace: true });
    },
  });
  return { signup, isLoading };
}
