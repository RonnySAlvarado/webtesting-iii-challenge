import React from "react";
import "@testing-library/react/cleanup-after-each";
import "jest-dom/extend-expect";
import Controls from "./Controls.js";
import Dashboard from "../dashboard/Dashboard";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";

describe("<Controls />", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(<Controls />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  xit("renders without crashing", () => {
    render(<Controls />);
  });

  //Initial render
  it("Testing controls", () => {
    const { getByTestId } = render(<Dashboard />);
    const toggleLock = getByTestId("toggle-lock");
    const toggleOpen = getByTestId("toggle-open");

    //gate unlocked and open
    expect(toggleLock).toHaveTextContent(/lock gate/i);
    expect(toggleLock).toBeDisabled();
    expect(toggleOpen).toHaveTextContent(/close gate/i);
    expect(toggleOpen).not.toBeDisabled();

    //gate closed, but unlocked
    fireEvent.click(toggleOpen);
    expect(toggleOpen).toHaveTextContent(/open gate/i);
    expect(toggleOpen).not.toBeDisabled();
    expect(toggleLock).toHaveTextContent(/lock gate/i);
    expect(toggleLock).not.toBeDisabled();

    //lock gate while closed
    fireEvent.click(toggleLock);
    expect(toggleOpen).toHaveTextContent(/open gate/i);
    expect(toggleOpen).toBeDisabled();
    expect(toggleLock).toHaveTextContent(/unlock gate/i);
    expect(toggleLock).not.toBeDisabled();

    //unlock gate while closed and locked
    fireEvent.click(toggleLock);
    expect(toggleOpen).toHaveTextContent(/open gate/i);
    expect(toggleOpen).not.toBeDisabled();
    expect(toggleLock).toHaveTextContent(/lock gate/i);
    expect(toggleLock).not.toBeDisabled();

    //open gate while unlocked
    fireEvent.click(toggleOpen);
    expect(toggleLock).toHaveTextContent(/lock gate/i);
    expect(toggleLock).toBeDisabled();
    expect(toggleOpen).toHaveTextContent(/close gate/i);
    expect(toggleOpen).not.toBeDisabled();
  });

  it("should call correct functions when the open/close or lock button is clicked and buttons are enabled", () => {
    const toggleLockedMock = jest.fn();
    const toggleOpenMock = jest.fn();
    const { getByTestId } = render(
      <Controls
        toggleLocked={toggleLockedMock}
        toggleClosed={toggleOpenMock}
        closed={true}
        locked={false}
      />
    );
    const toggleLock = getByTestId("toggle-lock");
    const toggleOpen = getByTestId("toggle-open");

    //Expect lock toggle to fire
    fireEvent.click(toggleLock);
    expect(toggleLockedMock).toHaveBeenCalledTimes(1);

    //Expect open toggle to fire
    fireEvent.click(toggleOpen);
    expect(toggleOpenMock).toHaveBeenCalledTimes(1);
  });

  it("Should not call any functions while buttons are disabled", () => {
    const toggleLockedMock = jest.fn();
    const toggleOpenMock = jest.fn();
    const { getByTestId } = render(
      <Controls
        toggleLocked={toggleLockedMock}
        toggleClosed={toggleOpenMock}
        closed={false}
        locked={true}
      />
    );
    const toggleLock = getByTestId("toggle-lock");
    const toggleOpen = getByTestId("toggle-open");

    //Expect lock toggle to do nothing
    fireEvent.click(toggleLock);
    expect(toggleLockedMock).toHaveBeenCalledTimes(0);

    //Expect open toggle to do nothing
    fireEvent.click(toggleOpen);
    expect(toggleOpenMock).toHaveBeenCalledTimes(0);
  });
});
