import { render, screen } from "@testing-library/react";
import ProfileDetails from "./ProfileDetails";

beforeEach(() => {
  render(<ProfileDetails />);
});

describe("Cadastral information", () => {
  test("renders first name registered by the user", () => {
    const nameValue = screen.getByLabelText("First Name:");

    expect(nameValue).toHaveDisplayValue("John");
  });

  test("renders last name registered by the user", () => {
    const nameValue = screen.getByLabelText("Last Name:");

    expect(nameValue).toHaveDisplayValue("Doe");
  });

  test("renders email registered by the user", () => {
    const emailValue = screen.getByLabelText("E-mail:");
    const emailRegex =
      /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    expect(emailValue).toHaveDisplayValue(emailRegex);
  });

  test("renders date of last visit", () => {
    const lastVisitValue = screen.getByLabelText("Last visited in:");
    const lastVisitRegex = new RegExp("^\\d{4}[-.]\\d{2}[-.]\\d{2}$");

    expect(lastVisitValue).toHaveDisplayValue(lastVisitRegex);
  });
});
