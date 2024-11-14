import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PokemonInfo from '../../components/pokemon/PokemonInfo';
import StatsTable from '../../components/table/StatsTable';
import Evolutions from '../../components/pokemon/Evolutions';
import ExploreButton from '../../components/layout/ExploreButton';
import pokemonData from '../../components/data/Pokemon';

const App = () => {
    const { name: paramName } = useParams();
    const name = paramName || "Dialga"; // Set default name to "Bulbasaur"
    const [pokemon, setPokemon] = useState(null);
    const [weaknesses, setWeaknesses] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            try {
                const data = pokemonData.find(p => p.name.toLowerCase() === name.toLowerCase());
                if (data) {
                    setPokemon(data);
                    // Assuming weaknesses are part of the data structure
                    setWeaknesses(data.weaknesses || []);
                } else {
                    console.error('Pokemon not found');
                }
            } catch (error) {
                console.error('Error fetching the pokemon data:', error);
            }
        };

        fetchData();
    }, [name]);

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="font-sans bg-gray-100 min-h-screen">
                <div className="mt-20"></div>
                <div className="container max-w-2xl mx-auto bg-white p-5 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4 text-center">{pokemon.name}</h1>
                    <PokemonInfo pokemon={pokemon} weaknesses={weaknesses} />
                    <StatsTable stats={pokemon.base_stats} />
                    <Evolutions evolutions={pokemon.evolutions} />
                    <ExploreButton />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default App;