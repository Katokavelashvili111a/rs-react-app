import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './Main.css';

const Main: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsParam = queryParams.get('details');

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allPokemons, setAllPokemons] = useState<any[]>([]);

  const currentPage = parseInt(page || "1");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2000`);
        setAllPokemons(response.data.results);
      } catch (error) {
        setError("Failed to fetch results");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const filteredResults = allPokemons.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedResults = filteredResults.slice(
      (currentPage - 1) * 9,
      currentPage * 9
    );

    setResults(paginatedResults);
  }, [searchTerm, currentPage, allPokemons]);

  const handlePagination = (newPage: number) => {
    if (newPage >= 1) {
      navigate(`/search/${newPage}${detailsParam ? `?details=${detailsParam}` : ''}`);
    }
  };

  const handlePokemonClick = (pokemonName: string) => {
    navigate(`/details/${pokemonName}`);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="card-list">
        {results.map((pokemon) => (
          <div key={pokemon.name} className="card" onClick={() => handlePokemonClick(pokemon.name)}>
            <h3>{pokemon.name}</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split("/")[6]}.png`}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
          aria-label="Previous Page"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => handlePagination(currentPage + 1)}
          aria-label="Next Page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Main;