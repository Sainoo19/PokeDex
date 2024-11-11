import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './pages/client/homepage';
import App from './pages/client/App';
import DetailPokemon from './pages/client/detailPokemon';
//import PokemonList from './pages/client/pokemon';
import PokemonList from './pages/client/pokemonBE';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:name" element={<DetailPokemon />} />
        <Route path="/pokemon/all" element={<PokemonList />} />
      </Routes>
    </Router>

  </React.StrictMode>
);
