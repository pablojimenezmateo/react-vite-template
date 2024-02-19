import { useMutation } from "@tanstack/react-query";
import { DemoData } from "../interfaces/DemoData";
import APIClient from "../services/APIClient";

const apiClient = new APIClient<DemoData>("/demo/");

const useDemo = () => {
  const getDemoMutation = useMutation({
    mutationFn: () => apiClient.get(null),
  });

  return getDemoMutation;
};

export default useDemo;
