import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

describe("Page content", () => {
  test("renders home page link to unauthenticated user", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
});
