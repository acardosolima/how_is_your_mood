import { render, screen } from "@testing-library/react";
import StartingPage from "./StartingPage";

describe("Page messages", () => {
  test("renders app value for the user", () => {
    render(<StartingPage />);

    const appValue = screen.getByText(
      "Sign up today and start feeling better!",
      {
        exact: false,
      }
    );
    expect(appValue).toBeInTheDocument();
  });
});
