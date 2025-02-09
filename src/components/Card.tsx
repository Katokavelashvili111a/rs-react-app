
import React from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  pokemonName: string;
}

const Card: React.FC<CardProps> = ({ pokemonName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/pokemon/${pokemonName}`); 
  };

  return (
    <div className="card" onClick={handleClick}>
      <h3>{pokemonName}</h3>
    </div>
  );
};

export default Card;
