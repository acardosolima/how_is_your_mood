import { render, screen } from "@testing-library/react";
import ProfileDetails from "./ProfileDetails";

describe("Cadastral information", () => {
  test("renders email registered by the user", () => {
    render(<ProfileDetails />);

    const emailValue = screen.getByAltText("email");
    const emailRegex =
      /[a-z0-9\._%+!$&*=^|~#%'`?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/;

    expect(emailValue).toHaveDisplayValue(emailRegex);
  });

  test("renders date of last visit", () => {
    render(<ProfileDetails />);

    const lastVisitValue = screen.getByAltText("lastVisit");
    const lastVisitRegex = new RegExp("^\\d{4}.\\d{2}.\\d{2}$");

    expect(lastVisitValue).toHaveDisplayValue(lastVisitRegex);
  });
});
