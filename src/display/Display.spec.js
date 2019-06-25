import React from "react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import Display from "./Display.js";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  render(<Display />);
});
