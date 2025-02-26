import React from "react";
import Card from "./Card"; // Import Card component
import './Cardlist.css';
interface Pokemon {
  name: string;
  url: string; // Ensure each Pokémon has a URL
}

interface CardListProps {
  results: Pokemon[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
  if (results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="card-list">
      {results.map((pokemon) => {
        const urlParts = pokemon.url.split("/");
        const pokemonId = urlParts[urlParts.length - 2]; // Ensure safe extraction

        return <Card key={pokemon.name} pokemonName={pokemon.name} pokemonId={pokemonId} />;
      })}
    </div>
  );
};

export default CardList;
