import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthPage from "../../pages/AuthPage";

describe("Page content", () => {
  test("renders login page passed as props.children", () => {
    render(
      <BrowserRouter>
        <Layout>
          <AuthPage />
        </Layout>
      </BrowserRouter>
    );

    const signUpText = screen.getByText("Create new account");
    expect(signUpText).toBeInTheDocument();
  });

  test("renders navigation bar with home link", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
  });
});
