import React, { PropsWithChildren, useEffect } from "react";
import useResetApp from "../hooks/useResetApp";

export const TokenHandlerContext = React.createContext({});

const TokenHandlerContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const resetApp = useResetApp();

  useEffect(() => {
    const handleTokenError = () => {
      resetApp();

      // Set a flag to show an error message on the login page
      localStorage.setItem("sessionError", "true");

      // We cannot use useNavigate here because this is outside of a routerProvider (main.tsx)
      window.location.href = "/";
    };

    // Listen for token errors (this is thrown by the API client)
    window.addEventListener("tokenError", handleTokenError);

    // Cleanup after component unmounts
    return () => {
      window.removeEventListener("tokenError", handleTokenError);
    };
  }, []);

  // Provide the context values (currently an empty object, but you can expand this)
  return (
    <TokenHandlerContext.Provider value={{}}>
      {children}
    </TokenHandlerContext.Provider>
  );
};

export default TokenHandlerContextProvider;
