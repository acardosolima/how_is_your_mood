import { Fragment } from "react";

import MainNavigation from "./MainNavigation";

// Component just wraps the content displayed, assuring the navigation bar always appears
const Layout = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
