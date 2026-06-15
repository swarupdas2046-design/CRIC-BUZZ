import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import {
  login as loginService,
  register as registerService,
} from "../services/authService";
import { setCredentials } from "../slices/userSlice";

// Read auth state from Redux: { user, token, isAuthenticated }.
export const useAuth = () => useSelector((state) => state.user);

// Shared mutation: run an auth service call, sync Redux, then redirect.
const useAuthMutation = (serviceFn) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: serviceFn,
    onSuccess: ({ token, user }) => {
      dispatch(setCredentials({ token, user }));
      navigate("/admin", { replace: true });
    },
  });
};

export const useLogin = () => useAuthMutation(loginService);
export const useRegister = () => useAuthMutation(registerService);
