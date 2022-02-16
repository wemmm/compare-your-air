import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Searchbox from "./Searchbox";

const options = ["Apple", "Banana", "Cherry"];

test("renders", () => {
  const component = renderer.create(
    <Searchbox placeholder="Placeholder" options={options} />
  );

  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders an autocompleted suggestion of options based on user input", () => {
  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "App" } });

  expect(input.value).toBe("App");
  expect(screen.getByText("Apple")).toBeInTheDocument();
  expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  expect(screen.getAllByRole("listitem").length).toBe(1);
});

test("is not case sensitive", () => {
  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "app" } });

  expect(input.value).toBe("app");
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
  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "Orange" } });

  expect(input.value).toBe("Orange");
  expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  expect(screen.queryByText("Banana")).not.toBeInTheDocument();
  expect(screen.queryByText("Cherry")).not.toBeInTheDocument();
  expect(screen.queryAllByRole("listitem").length).toBe(0);
});

test("removes suggestion list if input is empty", () => {
  const options = ["Apple", "Apricot", "Cherry"];

  render(<Searchbox placeholder="Placeholder" options={options} />);

  const input = screen.getByPlaceholderText("Placeholder");
  fireEvent.change(input, { target: { value: "Ap" } });

  expect(screen.getAllByRole("listitem").length).toBe(2);

  fireEvent.change(input, { target: { value: "" } });

  expect(screen.queryAllByRole("listitem").length).toBe(0);
});
