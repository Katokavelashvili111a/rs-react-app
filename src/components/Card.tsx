// src/components/Card.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleItem } from '../store/SelectedItemsSlice';


interface CardProps {
  pokemonName: string;
  pokemonId: string;
}

const Card: React.FC<CardProps> = ({ pokemonName, pokemonId }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
  const isSelected = selectedItems.some((item) => item.name === pokemonName);

  const handleCheckboxChange = () => {
    dispatch(
      toggleItem({ name: pokemonName, description: "A Pokémon", url: `/details/${pokemonName}` })
    );
  };

  return (
    <div className="card">
      <input type="checkbox" checked={isSelected} onChange={handleCheckboxChange} />
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
        alt={`Sprite of ${pokemonName}`}
      />
      <h3>{pokemonName}</h3>
    </div>
  );
};


export default Card;