import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import styles from "./AuthForm.module.css";

/*
------------------------------------------------------------------------
--- TODO: refactor component to outsource error message handling     ---
--- TODO: create custom hook to deal with http requests              ---
------------------------------------------------------------------------
*/

const AuthForm = () => {
  // Flag to control if user is trying to sign up or sign in
  const [isLogin, setIsLogin] = useState(true);

  // References to get data in email and password fields
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // Variable containing the standardized error messaage
  const [errorMessage, setErrorMessage] = useState("");

  // Context access point to get authentication token information
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  // Changes page behavior between sign up and sign in options
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);

    setErrorMessage("");
  };

  // Standardizes error message based on data returned by Firebase
  const parseErrorCodes = (res) => {
    let message = "";

    switch (res.error.message) {
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
          "We have blocked all requests from this device due to unusual activity. Please try again later.";
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

    setErrorMessage(message);
  };

  // Submits user credentials to Firebase endpoints
  const submitHandler = (event) => {
    event.preventDefault();

    setErrorMessage("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url = "";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYzuLlwNzGU5jpsnmWg3kKMWqKl5RY4-M";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBYzuLlwNzGU5jpsnmWg3kKMWqKl5RY4-M";
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // Both successfull and unsuccessfull requests returns a json body
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          parseErrorCodes(data);
          return;
        } else {
          // Expiration information is sent in seconds, converting date to timestamp
          const expiringDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          ).getTime();

          authCtx.login(data.idToken, expiringDate);

          // Redirects user to the profile page after login succeeded
          history.replace("/profile");
        }
      })
      .catch((err) => {
        // TODO: refactor error handling
        console.warn(err);
      });
  };

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
