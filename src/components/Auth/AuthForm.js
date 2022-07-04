import { useState, useRef, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "../UI/Modal";
import LoadingSpinner from "../UI/LoadingSpinner";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

import "bootstrap/dist/css/bootstrap.min.css";
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

    authCtx.login(data.localId, data.idToken, expiringDate);
  };

  // Submits user credentials to Firebase endpoints
  const submitHandler = async (event) => {
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
  };

  useEffect(() => {
    // Updates the error message to render on screen
    setErrorMessage(error);
  }, [error]);

  return (
    <section className={styles.auth}>
      <Form onSubmit={submitHandler}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <Form.Group className="mb-3" controlId="formLoginEmail">
          <Form.Label> Your e-mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            ref={emailInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginPassworld">
          <Form.Label> Your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            minLength="6"
            required
            ref={passwordInputRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLoginSubmitBtn">
          <Button variant="primary" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </Button>
        </Form.Group>

        <Form.Text onClick={switchAuthModeHandler} className={styles.toggle}>
          {isLogin ? "Create new account" : "Login with existing account"}
        </Form.Text>
      </Form>
    </section>
  );
};

export default AuthForm;
