import { Component } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

class App extends Component {
  state = {
    searchTerm: localStorage.getItem("searchTerm") || "",
  };

  handleSearch = (searchTerm: string) => {
    localStorage.setItem("searchTerm", searchTerm);
    this.setState({ searchTerm });
  };

  render() {
    return (
      <ErrorBoundary>
        <div>
          <Header onSearch={this.handleSearch} />
          <Main searchTerm={this.state.searchTerm} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
