import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardList from "../components/CardList";

const mockData = [
  { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
  { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" }
];

test("renders the specified number of cards", () => {
  render(<CardList results={mockData} />);

  expect(screen.getAllByRole("img")).toHaveLength(mockData.length);
});

test("displays 'No results found.' when results are empty", () => {
  render(<CardList results={[]} />);
  
  expect(screen.getByText("No results found.")).toBeInTheDocument();
});
