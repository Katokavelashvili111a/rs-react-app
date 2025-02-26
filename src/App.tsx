// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import Header from './components/Header';
import Main from './components/Main';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import PokemonDetails from './components/PokemonDetails';
import Flyout from './components/Flyout';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import './App.css';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');
  const selectedItems = useSelector((state: RootState) => state.selectedItems.items);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsParam = queryParams.get('details');
  const { theme } = useTheme();

  const handleSearch = (searchTerm: string) => {
    localStorage.setItem('searchTerm', searchTerm);
    setSearchTerm(searchTerm);
  };

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <Header onSearch={handleSearch} />
        <ThemeToggle />
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
          <Flyout />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;