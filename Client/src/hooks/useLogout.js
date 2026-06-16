import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

import { logout as logoutService } from "../services/authService";
import { logout as logoutAction } from "../slices/userSlice";

// Clears the session everywhere: storage, Redux, cached server state, then redirects.
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logoutService();          // remove token/user from localStorage
    dispatch(logoutAction()); // reset Redux auth state
    queryClient.clear();      // drop any cached private data
    navigate("/login", { replace: true });
  };
};
