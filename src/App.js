import { Redirect, Route, Switch } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout/Layout";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

/*
-----------------------------------------------------------------
--- TODO: Update React Router to v.6                          ---
-----------------------------------------------------------------
*/

function App() {
  // Context reference to check if user is logged in
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}

        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <ProfilePage />
          </Route>
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
