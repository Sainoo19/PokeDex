import React from 'react';

const typeToStyle = {
    Normal: "bg-gray-200 text-gray-800",
    Grass: "bg-green-200 text-green-800",
    Electric: "bg-yellow-200 text-yellow-800",
    Flying: "bg-purple-200 text-purple-800",
    Fire: "bg-red-200 text-red-800",
    Water: "bg-blue-200 text-blue-800",
    Bug: "bg-lime-200 text-lime-800",
    Fairy: "bg-pink-200 text-pink-800",
    Fighting: "bg-red-300 text-red-800",
    Psychic: "bg-pink-300 text-pink-800",
    Rock: "bg-yellow-300 text-yellow-800",
    Ghost: "bg-indigo-200 text-indigo-800",
    Ice: "bg-cyan-200 text-cyan-800",
    Dragon: "bg-blue-300 text-blue-800",
    Dark: "bg-gray-600 text-gray-200",
    Steel: "bg-gray-300 text-gray-800",
    Poison: "bg-purple-300 text-purple-800",
    Ground: "bg-brown-200 text-brown-800",
    // Add more types if needed
};

const PokemonInfo = ({ pokemon, weaknesses = [] }) => {
    console.log('Pokemon Info Props:', { pokemon, weaknesses });

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <img
                    src={`/assets/images/${pokemon.name}.png`}
                    alt={pokemon.name}
                    className="pokemon-image w-full rounded-lg"
                />
            </div>
            <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
                <p>{pokemon.description}</p>
                <div className="bg-blue-100 p-4 mt-4 rounded">
                    <p><strong>Height:</strong> {pokemon.height} m</p>
                    <p><strong>Weight:</strong> {pokemon.weight} kg</p>
                    <p><strong>Abilities:</strong> {pokemon.abilities.map(ability => ability.name).join(', ')}</p>
                </div>
                <div className="mt-4">
                    <p><strong>Type:</strong></p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {pokemon.type.map(t => (
                            <div key={t} className={`mt-3 px-5 py-1 rounded-lg ${typeToStyle[t] || "bg-gray-200 text-gray-800"}`}>
                                {t}
                            </div>
                        ))}
                    </div>
                    <p><strong>Weaknesses:</strong></p>
                    <div className="flex flex-wrap gap-2">
                        {Array.isArray(weaknesses) && weaknesses.length > 0 ? (
                            weaknesses.map(w => (
                                <div key={w} className={`mt-1 px-5 py-1 rounded-lg ${typeToStyle[w] || "bg-gray-200 text-gray-800"}`}>
                                    {w}
                                </div>
                            ))
                        ) : (
                            <p>No weaknesses available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonInfo;
