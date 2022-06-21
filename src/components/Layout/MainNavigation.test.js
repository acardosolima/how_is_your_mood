import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import MainNavigation from "./MainNavigation";

describe("Page content", () => {
  test("renders home page link to unauthenticated user", () => {
    render(
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    );

    const linkValue = screen.getByText("Home");
    expect(linkValue).toBeInTheDocument();
  });

  test("renders login page link to unauthenticated user", () => {
    render(
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    );

    const linkValue = screen.getByText("Login");
    expect(linkValue).toBeInTheDocument();
  });

  test("does not render logout link to unauthenticated user", async () => {
    render(
      <BrowserRouter>
        <MainNavigation />
      </BrowserRouter>
    );

    const linkValue = await screen.queryByText("Logout");
    expect(linkValue).not.toBeInTheDocument();
  });
});
