import { render, screen } from "@testing-library/react";
import ProfileDetails from "./ProfileDetails";

beforeEach(() => {
  render(<ProfileDetails />);
});

describe("Cadastral information", () => {
  test("renders email registered by the user", () => {
    const emailValue = screen.getByAltText("email");
    const emailRegex =
      /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/;

    expect(emailValue).toHaveDisplayValue(emailRegex);
  });

  test("renders date of last visit", () => {
    const lastVisitValue = screen.getByAltText("lastVisit");
    const lastVisitRegex = new RegExp("^\\d{4}.\\d{2}.\\d{2}$");

    expect(lastVisitValue).toHaveDisplayValue(lastVisitRegex);
  });
});
