import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PokemonDetails from "../components/PokemonDetails";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Mock the axios module
jest.mock("axios");

test("shows loading indicator while fetching data", () => {
  render(
    <BrowserRouter>
      <PokemonDetails />
    </BrowserRouter>
  );
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("displays Pokémon details correctly", async () => {
  // Mocking API response using axios mock
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: {
      name: "Bulbasaur",
      sprites: { front_default: "bulbasaur.png" },
      types: [{ type: { name: "Grass" } }, { type: { name: "Poison" } }],
      abilities: [{ ability: { name: "Overgrow" } }],
      stats: [{ stat: { name: "hp" }, base_stat: 45 }],
    },
  });

  render(
    <BrowserRouter>
      <PokemonDetails />
    </BrowserRouter>
  );

  // Wait for the data to be fetched and displayed
  await waitFor(() => screen.getByText("Bulbasaur"));

  expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  expect(screen.getByAltText("Bulbasaur")).toHaveAttribute("src", "bulbasaur.png");
  expect(screen.getByText("Grass, Poison")).toBeInTheDocument();
  expect(screen.getByText("Overgrow")).toBeInTheDocument();
  expect(screen.getByText("hp: 45")).toBeInTheDocument();
});

test("clicking close button hides component", async () => {
  // Mocking API response for close test
  (axios.get as jest.Mock).mockResolvedValueOnce({
    data: {
      name: "Bulbasaur",
      sprites: { front_default: "bulbasaur.png" },
      types: [{ type: { name: "Grass" } }, { type: { name: "Poison" } }],
      abilities: [{ ability: { name: "Overgrow" } }],
      stats: [{ stat: { name: "hp" }, base_stat: 45 }],
    },
  });

  render(
    <BrowserRouter>
      <PokemonDetails />
    </BrowserRouter>
  );

  // Wait for the Pokémon data to load
  await waitFor(() => screen.getByText("Bulbasaur"));

  // Close button click
  fireEvent.click(screen.getByText("Close"));

  // Check that the Pokémon name is no longer in the document after close
  expect(screen.queryByText("Bulbasaur")).not.toBeInTheDocument();
});
