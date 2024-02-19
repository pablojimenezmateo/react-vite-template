import { useQueryClient } from "@tanstack/react-query";

const useResetApp = () => {
  const queryClient = useQueryClient();
  const queryCache = queryClient.getQueryCache();
  const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);

  const reset = () => {
    // Save sessionError so that it survives the reset
    // it is used to show a message to the user in the login page
    const sessionError = localStorage.getItem("sessionError");

    // Local storage
    localStorage.clear();

    // Reset sessionError
    if (sessionError) {
      localStorage.setItem("sessionError", sessionError);
    }

    // Delete all react-query cache
    queryKeys.forEach((queryKey) => {
      queryClient.removeQueries({ queryKey, exact: true });
    });
  };

  return reset;
};

export default useResetApp;
