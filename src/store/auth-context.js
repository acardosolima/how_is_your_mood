import { createContext, useCallback, useEffect, useState } from "react";

/*
--------------------------------------------------------------------
--- TODO: Refactor component to outsource localstorage handling  ---
--------------------------------------------------------------------
*/

// Variable to hold the current timer function pointer
let logoutTimer;

// General context data model
const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

// Receives a date in future and calculates the difference in miliseconds
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();

  return expirationTime - currentTime;
};

// Gets token information from localstorage and validates auto-login
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpiresIn = localStorage.getItem("expiresIn");

  if (calculateRemainingTime(storedExpiresIn) <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    return null;
  }

  return {
    token: storedToken,
    expiresIn: storedExpiresIn,
  };
};

// Exposes AuthContextProvider to wrap the necessary components
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const initialToken = !!tokenData ? tokenData.token : "";
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  // Logs out the user and clean up the localstorage and timeer
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // Logs in the user, adding token information to localstorage and setting initial timer
  const loginHandler = (token, expiresIn) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn);

    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expiresIn));
  };

  // Updated context data, referencing variables and function pointers
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  // UseEffect function to enable autologin when user still has a valid token saved
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(
        logoutHandler,
        calculateRemainingTime(tokenData.expiresIn)
      );
    }
  }, [tokenData, logoutHandler]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
