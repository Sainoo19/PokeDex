import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Homepage from './pages/client/homepage';
import DetailPokemon from './pages/client/detailPokemon';
import DetailEvolution from './pages/client/detailEvolution';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/pokemon/:name" element={<DetailPokemon />} />
        <Route path="/evolution" element={<DetailEvolution />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
