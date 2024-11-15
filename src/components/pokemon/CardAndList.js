import React, { useState, useEffect } from 'react';
import axios from 'axios';

const typeToStyle = {
    Normal: "bg-gray-200 text-gray-800",
    Grass: "bg-green-200 text-green-800",
    Electric: "bg-yellow-300 text-yellow-900",
    Flying: "bg-purple-200 text-purple-800",
    Fire: "bg-red-200 text-red-800",
    Water: "bg-blue-200 text-blue-800",
    Bug: "bg-lime-200 text-lime-800",
    Fairy: "bg-pink-100 text-pink-800",
    Fighting: "bg-orange-300 text-orange-900",
    Psychic: "bg-pink-300 text-pink-800",
    Rock: "bg-amber-400 text-amber-900",
    Ghost: "bg-indigo-200 text-indigo-800",
    Ice: "bg-cyan-200 text-cyan-800",
    Dragon: "bg-blue-300 text-blue-800",
    Dark: "bg-gray-600 text-gray-200",
    Steel: "bg-gray-300 text-gray-800",
    Poison: "bg-purple-500 text-purple-100",
    Ground: "bg-amber-700 text-yellow-200",
};

const PokemonCardList = ({ selectedPokemon, onSelect }) => {
    const [showList, setShowList] = useState(false);
    const [pokemonList, setPokemonList] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/pokemon/');
                setPokemonList(response.data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            }
        };

        fetchPokemon();
    }, []);

    const handleSelect = async (pokemon) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/pokemon/name/${pokemon.name}`);
            onSelect(response.data);
            setShowList(false);
        } catch (error) {
            console.error('Error fetching Pokémon details:', error);
        }
    };

    const filteredPokemonList = pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white p-4 rounded-lg shadow-md text-center relative cursor-pointer">
            {selectedPokemon ? (
                <>
                    <img src={`/assets/images/${selectedPokemon.name}.png`} alt={selectedPokemon.name} className="mx-auto mb-2" />
                    <h3 className="text-lg font-bold">{selectedPokemon.name}</h3>
                    <div className="flex flex-wrap justify-center absolute top-2 right-2">
                        {Array.isArray(selectedPokemon.type) && selectedPokemon.type.map((t, index) => (
                            <div key={index} className={`px-2 py-1 rounded-lg ${typeToStyle[t] || "bg-gray-200 text-gray-800"} mr-1`}>
                                {t}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => setShowList(true)} className="text-blue-500 mt-2">Change Pokémon</button>
                </>
            ) : (
                <button onClick={() => setShowList(true)} className="text-blue-500">Select Pokémon</button>
            )}

            {showList && (
                <div className="absolute bg-white border mt-2 p-2 max-h-48 overflow-y-auto z-10 w-full">
                    <input
                        type="text"
                        placeholder="Search Pokémon"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 mb-2 border rounded"
                    />
                    {filteredPokemonList.map((pokemon) => (
                        <div key={pokemon._id} onClick={() => handleSelect(pokemon)} className="cursor-pointer p-1 hover:bg-gray-100">
                            {pokemon.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PokemonCardList;