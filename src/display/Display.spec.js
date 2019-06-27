import React from "react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import Display from "./Display.js";
import Dashboard from '../dashboard/Dashboard';
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("<Display />", () => {
  it("Should match snapshot", () => {
    const tree = renderer.create(<Display />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Should display proper colors and text for each of the 3 states", () => {
    const { getByTestId } = render(<Dashboard />);
    const lockButton = getByTestId("toggle-lock");
    const openButton = getByTestId("toggle-open");
    const lockedLed = getByTestId("locked-led");
    const closedLed = getByTestId("closed-led");

    //LED to be green on both due to unlocked and open
    expect(lockedLed).toHaveTextContent(/unlocked/i);
    expect(lockedLed).toHaveClass("green-led");
    expect(closedLed).toHaveTextContent(/open/i);
    expect(closedLed).toHaveClass("green-led");

    //LED to be red on closed, but still green since it is still unlocked
    fireEvent.click(openButton);
    expect(lockedLed).toHaveTextContent(/unlocked/i);
    expect(lockedLed).toHaveClass("green-led");
    expect(closedLed).toHaveClass("red-led");
    expect(closedLed).toHaveTextContent(/closed/i);

    //LED to be red on closed and also red for locked since we just locked it
    fireEvent.click(lockButton);
    expect(lockedLed).toHaveTextContent(/locked/i);
    expect(lockedLed).toHaveClass("red-led");
    expect(closedLed).toHaveClass("red-led");
    expect(closedLed).toHaveTextContent(/closed/i);
  });
});
