import React from "react";

interface PokemonDisplay {
  name: string;
  description: string;
}

interface CardListProps {
  results: PokemonDisplay[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
  return (
    <div className="card-list">
      {results.slice(0, 5).map((pokemon, index) => (
        <div className="card" key={index}>
          <h3>{pokemon.name}</h3>
          <p>{pokemon.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardList;
