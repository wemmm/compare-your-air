import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Card from "./Card";

const mockCityData = {
  city: "Manchester",
  location: "Salford Eccles",
  measurements: [
    {
      lastUpdated: "2022-02-14T21:00:00Z",
      parameter: "pm10",
      value: 13,
    },
  ],
};

test("renders", () => {
  const component = renderer.create(
    <Card cityData={mockCityData} onClose={jest.fn} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("displays data passed in as prop", () => {
  render(<Card cityData={mockCityData} onClose={jest.fn} />);

  expect(screen.getByText("Salford Eccles")).toBeInTheDocument();
  expect(screen.getByText("in Manchester, United Kingdom")).toBeInTheDocument();
  expect(screen.getByText("Values: PM10: 13")).toBeInTheDocument();
});

test("calls onClose function when close button is clicked", () => {
  const mockFunction = jest.fn();

  render(<Card cityData={mockCityData} onClose={mockFunction} />);

  fireEvent.click(screen.getByRole("button"));

  expect(mockFunction).toHaveBeenCalledTimes(1);
});
