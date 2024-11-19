import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './pages/client/homepage';
import DetailPokemon from './pages/client/detailPokemon';
import Move from './pages/client/move';

import DetailEvolution from './pages/client/detailEvolution';

import PokemonList from './pages/client/pokemonBE';
import About from './pages/client/About';
import ComparisonPage from './pages/client/comparisonPage';
import AdminPokemon from './pages/admin/Pokemon';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:name" element={<DetailPokemon />} />
        <Route path="/moves" element={<Move />} />
        <Route path="/evolution" element={<DetailEvolution />} />
        <Route path="/about" element={<About />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/pokemon/all" element={<PokemonList />} />
        <Route path="/admin/pokemon" element={<AdminPokemon />} />

      </Routes>
    </Router>

  </React.StrictMode>
);
