import { render, screen, fireEvent } from "@testing-library/react";
import Card from "../components/Card";

test("renders relevant card data", () => {
  const mockCard = { pokemonName: "Bulbasaur", pokemonId: "1" }; // Use correct prop names
  render(<Card {...mockCard} />);

  expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  );
});

test("clicking on a card navigates to detailed view", () => {
  const mockCard = { pokemonName: "Bulbasaur", pokemonId: "1" };
  const mockNavigate = jest.fn();

  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate, // Mock useNavigate
  }));

  render(<Card {...mockCard} />);
  
  fireEvent.click(screen.getByText("Bulbasaur"));
  expect(mockNavigate).toHaveBeenCalledWith("/pokemon/Bulbasaur");
});

