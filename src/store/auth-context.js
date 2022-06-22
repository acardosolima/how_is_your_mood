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
  userID: "",
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
  const storedUserID = localStorage.getItem("userID");

  if (calculateRemainingTime(storedExpiresIn) <= 60000) {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    return null;
  }

  return {
    token: storedToken,
    expiresIn: storedExpiresIn,
    userID: storedUserID,
  };
};

// Exposes AuthContextProvider to wrap the necessary components
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const [token, setToken] = useState(!!tokenData ? tokenData.token : "");
  const [userID, setUserID] = useState(!!tokenData ? tokenData.userID : "");

  const userIsLoggedIn = !!token;

  // Logs out the user and clean up the localstorage and timeer
  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  // Logs in the user, adding token information to localstorage and setting initial timer
  const loginHandler = (userID, token, expiresIn) => {
    setUserID(userID);
    setToken(token);
    localStorage.setItem("userID", userID);
    localStorage.setItem("token", token);
    localStorage.setItem("expiresIn", expiresIn);

    logoutTimer = setTimeout(logoutHandler, calculateRemainingTime(expiresIn));
  };

  // Updated context data, referencing variables and function pointers
  const contextValue = {
    token,
    userID,
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
