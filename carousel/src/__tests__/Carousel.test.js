import React from "react";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Carousel from "../Carousel.js";
import TEST_IMAGES from "../_testCommon.js";

// Smoke test
it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

// Snapshot test
it("matches snapshot", function() {
  const tree = renderer.create(<Carousel photos={TEST_IMAGES} title="images for testing" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

// Test for the left arrow functionality
it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
      />
  );

  // Move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
});

// Test for hiding the left arrow on the first image
it("hides the left arrow on the first image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Expect the left arrow to be missing on the first image
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

  // Expect the right arrow to be present on the first image
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).toBeInTheDocument();
});

// Test for hiding the right arrow on the last image
it("hides the right arrow on the last image", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // Move to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Expect the right arrow to be missing on the last image
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();

  // Expect the left arrow to be present on the last image
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).toBeInTheDocument();
});
