import { render, screen, fireEvent } from "@testing-library/react";
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
  render(<Card cityData={mockCityData} />);

  expect(screen.getByText("Manchester")).toBeInTheDocument();
  expect(
    screen.getByText("In Salford Eccles, United Kingdom")
  ).toBeInTheDocument();
});
