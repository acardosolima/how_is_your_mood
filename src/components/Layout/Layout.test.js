import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import AuthPage from "../../pages/AuthPage";
import HomePage from "../../pages/HomePage";
import ProfilePage from "../../pages/ProfilePage";

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

  test("renders home page passed as props.children", () => {
    render(
      <BrowserRouter>
        <Layout>
          <HomePage />
        </Layout>
      </BrowserRouter>
    );

    const appValue = screen.getByText(
      "Sign up today and start feeling better!",
      { exact: false }
    );
    expect(appValue).toBeInTheDocument();
  });

  test("renders profile page passed as props.children", () => {
    render(
      <BrowserRouter>
        <Layout>
          <ProfilePage />
        </Layout>
      </BrowserRouter>
    );

    const appValue = screen.getByLabelText("Last visited in:");
    expect(appValue).toBeInTheDocument();
  });
});
