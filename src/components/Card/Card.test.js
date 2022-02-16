import { render, screen } from "@testing-library/react";
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

test("renders data passed in as prop", () => {
  render(<Card cityData={mockCityData} />);

  expect(screen.getByText("Salford Eccles")).toBeInTheDocument();
  expect(screen.getByText("in Manchester, United Kingdom")).toBeInTheDocument();
  expect(screen.getByText("Values: PM10: 13")).toBeInTheDocument();
});
