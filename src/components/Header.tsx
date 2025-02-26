// Header.tsx

import React, { useState } from "react";
import './Header.css';

const Header: React.FC<{ onSearch: (searchTerm: string) => void }> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem("searchTerm", trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <header>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter search term"
      />
      <button onClick={handleSearchClick}>Search</button>
    </header>
  );
};

export default Header;
