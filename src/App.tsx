import React, { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./components/NotFound";
import PokemonDetails from "./components/PokemonDetails";
import './App.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm") || "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsParam = queryParams.get('details');

  const handleSearch = (searchTerm: string) => {
    localStorage.setItem("searchTerm", searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <ErrorBoundary>
      <Header onSearch={handleSearch} />
      <div className="container">
        <Routes>
        <Route path="/details/:name" element={<PokemonDetails />} />
          <Route path="/" element={<Navigate to="/search/1" />} />
          <Route path="/search/:page" element={<Main searchTerm={searchTerm} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {detailsParam && (
          <div className="details-panel">
            <PokemonDetails />
            <button onClick={() => window.history.back()}>Close</button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;