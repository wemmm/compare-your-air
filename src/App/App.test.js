import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

const options = ["Mace Head", "Manchester", "Market Harborough", "Liverpool"];
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

beforeEach(() => sessionStorage.setItem("cities", JSON.stringify(options)));

test("renders main header", () => {
  render(<App />);

  expect(screen.getByText("Compare your Air")).toBeInTheDocument();
});

test("renders a loading spinner if city data not loaded", () => {
  sessionStorage.clear();

  render(<App />);

  expect(screen.getByText("spinner.svg")).toBeInTheDocument();
});

test("renders UI if city data is found in session storage", () => {
  render(<App />);

  expect(screen.queryByText("spinner.svg")).not.toBeInTheDocument();
  expect(screen.getByPlaceholderText("Enter city name...")).toBeInTheDocument();
});

test("renders a list of possible matches from cities in session storage", () => {
  sessionStorage.setItem(
    "cities",
    JSON.stringify(["Mace Head", "Manchester", "Market Harborough, Liverpool"])
  );

  render(<App />);

  const input = screen.getByPlaceholderText("Enter city name...");
  fireEvent.change(input, { target: { value: "M" } });

  expect(screen.queryAllByRole("listitem").length).toBe(3);
});

test("fetches the selected city when clicked and displays air quality info", async () => {
  sessionStorage.clear();

  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        ok: true,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({
              results: [mockCityData],
            });
          }),
      });
    });
  });

  render(<App />);

  await waitFor(() => {
    expect(
      screen.getByPlaceholderText("Enter city name...")
    ).toBeInTheDocument();
  });

  const input = screen.getByPlaceholderText("Enter city name...");
  fireEvent.change(input, { target: { value: "M" } });
  fireEvent.click(screen.getByText("Manchester"));

  expect(await screen.findByText("Salford Eccles")).toBeInTheDocument();
  expect(await screen.findByText("Values: PM10: 13")).toBeInTheDocument();
  expect(
    await screen.findByText("in Manchester, United Kingdom")
  ).toBeInTheDocument();
});

test("Removes card when close button is clicked", async () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        ok: true,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({
              results: [mockCityData],
            });
          }),
      });
    });
  });

  render(<App />);

  const input = screen.getByPlaceholderText("Enter city name...");
  fireEvent.change(input, { target: { value: "M" } });
  fireEvent.click(screen.getByText("Manchester"));

  expect(await screen.findByText("Salford Eccles")).toBeInTheDocument();
  expect(await screen.findByRole("button")).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button"));
  expect(screen.queryByText("Salford Eccles")).not.toBeInTheDocument();
});

test("does not add cards that would be duplicates", async () => {
  window.fetch = jest.fn().mockImplementation(() => {
    return new Promise((resolve, reject) => {
      resolve({
        status: 200,
        ok: true,
        json: () =>
          new Promise((resolve, reject) => {
            resolve({
              results: [mockCityData],
            });
          }),
      });
    });
  });

  render(<App />);

  const input = screen.getByPlaceholderText("Enter city name...");
  fireEvent.change(input, { target: { value: "M" } });
  fireEvent.click(screen.getByText("Manchester"));

  let locationNames = await screen.findAllByText("Salford Eccles");
  expect(locationNames).toHaveLength(1);

  fireEvent.click(screen.getByText("Manchester"));
  locationNames = await screen.findAllByText("Salford Eccles");
  expect(locationNames).toHaveLength(1);
});
