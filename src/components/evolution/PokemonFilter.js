// PokemonFilter.js
import React from 'react';

const PokemonFilter = ({ searchTerm, onInputChange }) => {
    return (
        <div className="flex items-center justify-center mb-4">
            <p className="mr-2 font-bold">Filter Pokémon:</p>
            <input
                type="text"
                className="border border-gray-300 p-2 rounded w-56"
                placeholder="Pokémon name"
                value={searchTerm}
                onChange={onInputChange}
            />
        </div>
    );
};

export default PokemonFilter;
