import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./AuthForm";

beforeEach(() => {
  render(<AuthForm />);
});

describe("Page Content", () => {
  test("renders two buttons in form", () => {
    const buttons = screen.getAllByRole("button");

    // Validates if there are only two buttons: submit (login/signup) and toggle
    expect(buttons).toHaveLength(2);
  });

  test("renders login form", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons[0].innerHTML).toEqual("Login");
  });

  test("renders signup form", () => {
    const buttons = screen.getAllByRole("button");

    // Clicks the second button to enable sign up option
    fireEvent.click(buttons[1]);
    expect(buttons[0].innerHTML).toEqual("Create Account");
  });
});
