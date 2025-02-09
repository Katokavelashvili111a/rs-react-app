import React from "react";

interface CardListProps {
  results: any[];
}

const CardList: React.FC<CardListProps> = ({ results }) => {
  if (results.length === 0) {
    return <div>No results found.</div>;
  }

  return (
    <div className="card-list">
      {results.map((pokemon) => (
        <div className="card" key={pokemon.name}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`} alt={pokemon.name} />

          <h3>{pokemon.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default CardList;
