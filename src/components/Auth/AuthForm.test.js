import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";

beforeEach(() => {
  render(<AuthForm />);
});

describe("Page Content", () => {
  test("renders two buttons in form", () => {
    const buttons = screen.getAllByRole("button");

    // Validates if there are only one button: submit (login/signup)
    expect(buttons).toHaveLength(1);
  });

  test("renders login form", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].innerHTML).toEqual("Login");
  });

  test("renders signup form", () => {
    const toggle = screen.getByText("Create new account");
    const button = screen.getByRole("button");

    // Clicks the toggle button to enable sign up option
    fireEvent.click(toggle);
    expect(button.innerHTML).toEqual("Create Account");
  });
});
