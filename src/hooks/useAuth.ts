import { useMutation } from "@tanstack/react-query";
import { LoginData } from "../interfaces/LoginData";
import { Me } from "../interfaces/Me";
import PublicAPIClient from "../services/PublicApiClient";

const apiClient = new PublicAPIClient<Me>("/token/");

const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (logindata: LoginData) => apiClient.post(logindata),
  });

  return loginMutation;
};

export default useAuth;
