import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies, withCookies } from "react-cookie";

const logout = async () => {
  const response = await fetch(`http://127.0.0.1:5000/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Logged out");
  }

  const data = await response.json();
  return data;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => logout(),
    onSuccess: (data) => {
      const [, , removeCookie] = useCookies();
      removeCookie("access_token_cookie");
    },
    retry: 2,
  });
};
