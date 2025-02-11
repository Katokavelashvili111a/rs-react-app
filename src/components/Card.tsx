import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  pokemonName: string;
  pokemonId: string;
}

const Card: React.FC<CardProps> = ({ pokemonName, pokemonId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemonName}`);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={`Sprite of ${pokemonName}`}
      />
      <h3>{pokemonName}</h3>
    </div>
  );
};

export default Card;
