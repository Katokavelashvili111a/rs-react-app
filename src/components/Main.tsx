import { Component } from "react";
import axios from "axios";
import CardList from "./CardList";
import Popup from "./Popup";

interface MainProps {
  searchTerm: string;
}

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDisplay {
  name: string;
  description: string;
}

interface MainState {
  results: PokemonDisplay[];
  isLoading: boolean;
  error: string | null;
  showErrorPopup: boolean;
}

class Main extends Component<MainProps, MainState> {
  constructor(props: MainProps) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
      showErrorPopup: false,
    };
  }

  fetchResults = async (searchTerm: string) => {
    this.setState({ isLoading: true, error: null });
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100",
      );
      let results: Pokemon[] = response.data.results || [];

      if (searchTerm) {
        results = results.filter((pokemon: Pokemon) =>
          pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
      }

      const formattedResults = results.map((pokemon) => ({
        name: pokemon.name,
        description: `A Pokémon named ${pokemon.name}`,
      }));

      this.setState({ results: formattedResults, isLoading: false });
    } catch (error) {
      this.setState({ error: "Failed to fetch results", isLoading: false });
    }
  };

  handleErrorButtonClick = () => {
    this.setState({ showErrorPopup: true });
  };

  closePopup = () => {
    this.setState({ showErrorPopup: false });
  };

  componentDidMount() {
    this.fetchResults(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: MainProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchResults(this.props.searchTerm);
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading && <div>Loading...</div>}
        {this.state.error && <div>{this.state.error}</div>}
        <CardList results={this.state.results} />
        <button onClick={this.handleErrorButtonClick}>Throw Error</button>

        {}
        {this.state.showErrorPopup && (
          <Popup message="An error occurred!" onClose={this.closePopup} />
        )}
      </div>
    );
  }
}

export default Main;
