import React from "react";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "./Card";

// Smoke test
it("renders without crashing", function() {
    render(<Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />);
});

// Snapshot test
it("matches snapshot", function() {
    const tree = renderer.create(<Card caption="test caption" src="test.jpg" currNum={1} totalNum={3} />).toJSON();
    expect(tree).toMatchSnapshot();
});