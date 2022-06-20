import { Fragment, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  // Context access point to check which links should be enabled, considering user login status
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  // Logs the user out and redirects to the login page
  const logoutHandler = () => {
    authCtx.logout();

    history.replace("/auth");
  };

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>How is your mood?</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          {!authCtx.isLoggedIn && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}

          {authCtx.isLoggedIn && (
            <Fragment>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
