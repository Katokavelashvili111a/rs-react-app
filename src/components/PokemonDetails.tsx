import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PokemonDetails.css';

interface PokemonStat {
    stat: {
        name: string;
    };
    base_stat: number;
}

interface PokemonType {
    type: {
        name: string;
    };
}

interface PokemonAbility {
    ability: {
        name: string;
    };
}

interface PokemonDetails {
    name: string;
    sprites: {
        front_default: string;
    };
    types: PokemonType[];
    abilities: PokemonAbility[];
    stats: PokemonStat[];
}

const PokemonDetails: React.FC = () => {
    const { name } = useParams<{ name: string }>();
    const navigate = useNavigate();

    const [details, setDetails] = useState<PokemonDetails | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!name) {
            setError('No Pokémon name provided.');
            return;
        }

        setIsLoading(true);
        setError(null);

        axios
            .get<PokemonDetails>(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then((response) => {
                setDetails(response.data);
            })
            .catch((err) => {
                console.error('Error fetching Pokémon details:', err); 
                setError('Failed to fetch Pokémon details.');
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
            <div className="pokemon-details">
                <h2>{details.name}</h2>
                <img src={details.sprites.front_default} alt={details.name} />
                <div className="details-section">
                    <h3>Types:</h3>
                    <p>{details.types.map((type) => type.type.name).join(', ')}</p>
                </div>
                <div className="details-section">
                    <h3>Abilities:</h3>
                    <p>{details.abilities.map((ability) => ability.ability.name).join(', ')}</p>
                </div>
                <div className="details-section">
                    <h3>Stats:</h3>
                    <ul>
                        {details.stats.map((stat) => (
                            <li key={stat.stat.name}>
                                {stat.stat.name}: {stat.base_stat}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <button className="close-button" onClick={() => navigate(-1)}>
                Close
            </button>
        </div>
    );
};

export default PokemonDetails;
