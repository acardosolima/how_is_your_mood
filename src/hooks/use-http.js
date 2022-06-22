import { useState, useCallback } from "react";

// Standardizes error message based on data returned by Firebase
const parseErrorCodes = (res) => {
  let message = "";

  switch (res) {
    case "WEAK_PASSWORD : Password should be at least 6 characters":
      message = "Password should be at least 6 characters";
      break;

    case "EMAIL_EXISTS":
      message = "This email address is already in use by another account.";
      break;

    case "OPERATION_NOT_ALLOWED":
      message = "Password sign-in is disabled for this project.";
      break;

    case "TOO_MANY_ATTEMPTS_TRY_LATER":
      message =
        "Access to this account has been temporarily disabled due to many failed login attempts.";
      break;

    case "TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.":
      message =
        "Access to this account has been temporarily disabled due to many failed login attempts.";
      break;

    case "EMAIL_NOT_FOUND":
      message = "There is no user record corresponding to this identifier.";
      break;

    case "INVALID_PASSWORD":
      message = "The combination user/password is invalid.";
      break;

    case "USER_DISABLED":
      message = "The user account has been disabled by an administrator.";
      break;

    default:
      message = "An unknown error has occured. Please try again later.";
  }

  return message;
};

const useHttp = () => {
  // State to handle awaiting status, to show a loading component
  const [isLoading, setIsloading] = useState(false);

  const [error, setError] = useState(null);

  // Expects two arguments: the request config and a function to parse the data
  const sendRequest = useCallback(async (requestConfig, handleDataFn) => {
    setIsloading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = parseErrorCodes(data.error.message);
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      handleDataFn(data);
    } catch (err) {}
    setIsloading(false);
  }, []);

  return [isLoading, error, sendRequest];
};

export default useHttp;
