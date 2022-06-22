import { useState, useRef, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  // Flag to control if user is trying to sign up or sign in
  const [isLogin, setIsLogin] = useState(true);

  // References to get data in email and password fields
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // Custom hook to deal with http requests
  const [isLoading, error, sendRequest] = useHttp();

  // Variable containing the standardized error message
  const [errorMessage, setErrorMessage] = useState(null);

  // Context access point to get authentication token information
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  // Changes page behavior between sign up and sign in options
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

    setErrorMessage(null);
  };

  const persistTokenData = (data) => {
    // Expiration information is sent in seconds, converting date to timestamp
    const expiringDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    ).getTime();

    authCtx.login(data.idToken, expiringDate);
  };

  // Submits user credentials to Firebase endpoints
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url;

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYzuLlwNzGU5jpsnmWg3kKMWqKl5RY4-M";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYzuLlwNzGU5jpsnmWg3kKMWqKl5RY4-M";
    }

    sendRequest(
      {
        url: url,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        },
      },
      persistTokenData
    );

    // Redirects user to the profile page after login succeeded
    if (!error) {
      history.replace("/profile");
    }
  };

  useEffect(() => {
    // Updates the error message to render on screen
    setErrorMessage(error);
  }, [error]);

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>

      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>

        <div className={styles.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            minLength="6"
            required
            ref={passwordInputRef}
          />
        </div>

        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={styles.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>

      <p className={styles.error}> {errorMessage}</p>
    </section>
  );
};

export default AuthForm;
