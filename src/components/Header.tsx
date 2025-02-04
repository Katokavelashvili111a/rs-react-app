import React, { Component } from "react";

interface HeaderProps {
  onSearch: (searchTerm: string) => void;
}

interface HeaderState {
  searchTerm: string;
}

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem("searchTerm") || "",
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchClick = () => {
    const searchTerm = this.state.searchTerm.trim();
    localStorage.setItem("searchTerm", searchTerm);
    this.props.onSearch(searchTerm);
  };

  render() {
    return (
      <header>
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Enter search term"
        />
        <button onClick={this.handleSearchClick}>Search</button>
      </header>
    );
  }
}

export default Header;
