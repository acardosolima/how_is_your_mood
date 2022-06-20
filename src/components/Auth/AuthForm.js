import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const parseErrorCodes = (res) => {
    let message = "";

    switch (res.error.message) {
      case "EMAIL_EXISTS":
        message = "The email address is already in use by another account.";
        break;

      case "OPERATION_NOT_ALLOWED":
        message = "Password sign-in is disabled for this project.";
        break;

      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        message =
          "We have blocked all requests from this device due to unusual activity. Pleas try again later.";
        break;

      default:
        message = "An unknown error has occured. Please try again later.";
    }

    setErrorMessage(message);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setErrorMessage("");

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = emailInputRef.current.value;
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
    }).then((res) => {
      if (res.ok) {
        return res.json().then((data) => console.log(data));
      } else {
        return res.json().then((data) => parseErrorCodes(data));
      }
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
      <p className={classes.error}> {errorMessage}</p>
    </section>
  );
};

export default AuthForm;
