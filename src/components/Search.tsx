import React, { useState, useEffect } from 'react';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const storedTerm = localStorage.getItem('searchTerm');
    if (storedTerm) {
      setSearchTerm(storedTerm);
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem('searchTerm', searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
