import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders CountryListPage", () => {
  render(<App />);
  const header = screen.getByText(/Country Information List Page/i);
  expect(header).toBeInTheDocument();
});
