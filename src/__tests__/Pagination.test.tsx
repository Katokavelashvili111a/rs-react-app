import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest'; 
import Main from '../components/Main';
import axios from 'axios';

// Mock the axios.get call
vi.mock('axios', () => ({
  get: vi.fn(),
}));

test('renders the correct number of cards based on pagination', async () => {
  const mockResults = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];

  // Mock axios.get to return mockResults
  (axios.get as vi.Mock).mockResolvedValue({ data: { results: mockResults } });

  render(
    <MemoryRouter initialEntries={['/search/1']}>
      <Routes>
        <Route path="/search/:page" element={<Main searchTerm="" />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the component to load the cards
  await waitFor(() => {
    expect(screen.getByText('Page 1')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});

test('clicking next button updates the page number', async () => {
  const mockResults = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  // Mock axios.get to return mockResults
  (axios.get as vi.Mock).mockResolvedValue({ data: { results: mockResults } });

  render(
    <MemoryRouter initialEntries={['/search/1']}>
      <Routes>
        <Route path="/search/:page" element={<Main searchTerm="" />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Next'));

  // Wait for the page to update and assert that the page number is updated (page 2)
  await waitFor(() => {
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });
});

test('clicking previous button does not go below page 1', async () => {
  const mockResults = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  // Mock axios.get to return mockResults
  (axios.get as vi.Mock).mockResolvedValue({ data: { results: mockResults } });

  render(
    <MemoryRouter initialEntries={['/search/1']}>
      <Routes>
        <Route path="/search/:page" element={<Main searchTerm="" />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Previous'));

  // Wait for the page to ensure it does not go below 1
  await waitFor(() => {
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});

test('clicking next button updates URL with search term', async () => {
  const mockResults = [
    { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  // Mock axios.get to return mockResults
  (axios.get as vi.Mock).mockResolvedValue({ data: { results: mockResults } });

  render(
    <MemoryRouter initialEntries={['/search/1?details=true']}>
      <Routes>
        <Route path="/search/:page" element={<Main searchTerm="Pikachu" />} />
      </Routes>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText('Next'));

  // Wait for the page to update and check the URL
  await waitFor(() => {
    expect(window.location.href).toContain('page=2');
    expect(window.location.href).toContain('details=true');
  });
});
