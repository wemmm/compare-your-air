import { render, screen, fireEvent } from "@testing-library/react";
import Searchbox from "./Searchbox";

test("renders", () => {
  render(<Searchbox placeholder="Placeholder" />);

  expect(screen.getByPlaceholderText("Placeholder")).toBeInTheDocument();
});

test("renders an autocompleted suggestion of options based on user input", () => {
  const options = ["Apple", "Banana", "Cherry"];

  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "App" } });

  expect(input.value).toBe("App");
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toBe(1);
});

test("can have multiple matches", () => {
  const options = ["Apple", "Apricot", "Cherry"];

  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "Ap" } });

  expect(input.value).toBe("Ap");
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.getByText("Apricot")).toBeInTheDocument();
  expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toBe(2);
});

test("can have no matches", () => {
  const options = ["Apple", "Banana", "Cherry"];

  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "Orange" } });

  expect(input.value).toBe("Orange");
  expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  expect(screen.queryAllByRole("listitem").length).toBe(0);
});
