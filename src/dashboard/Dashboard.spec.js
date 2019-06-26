import React from "react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import Dashboard from "./Dashboard.js";
import { render } from "@testing-library/react";

xit("renders without crashing", () => {
  render(<Dashboard />);
});
