import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './PokemonDetails.css';

const PokemonDetails: React.FC = () => {
  const { name } = useParams(); // Get the Pokémon name from the URL
  const navigate = useNavigate(); // Hook to navigate back
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setError("No Pokémon name provided.");
      return;
    }

    setIsLoading(true);
    setError(null);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        console.log("API Response:", response.data); // Debugging: Log the API response
        setDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon details:", error); // Debugging: Log the error
        setError("Failed to fetch Pokémon details.");
        setDetails(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [name]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!details) {
    return <div>No Pokémon details found.</div>;
  }

  return (
    <div className="pokemon-details-container">
      {/* Pokémon Details Card */}
      <div className="pokemon-details">
        <h2>{details.name}</h2>
        <img src={details.sprites?.front_default} alt={details.name} />
        <div className="details-section">
          <h3>Types:</h3>
          <p>{details.types?.map((type: any) => type.type.name).join(", ")}</p>
        </div>
        <div className="details-section">
          <h3>Abilities:</h3>
          <p>{details.abilities?.map((ability: any) => ability.ability.name).join(", ")}</p>
        </div>
        <div className="details-section">
          <h3>Stats:</h3>
          <ul>
            {details.stats?.map((stat: any) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {}
      <button className="close-button" onClick={() => navigate(-1)}>Close</button>
    </div>
  );
};

export default PokemonDetails;
