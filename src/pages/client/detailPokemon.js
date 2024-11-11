import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PokemonInfo from '../../components/pokemon/PokemonInfo';
import StatsTable from '../../components/table/StatsTable';
import Evolutions from '../../components/pokemon/Evolutions';
import ExploreButton from '../../components/layout/ExploreButton';

const DetailPokemon = () => {
    const { name } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [weaknesses, setWeaknesses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pokemonResponse, typeResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/pokemon/${name}`),
                    axios.get(`http://localhost:8080/api/pokemon/type/${name}`)
                ]);

                setPokemon(pokemonResponse.data);
                setWeaknesses(typeResponse.data);
              
            } catch (error) {
                console.error('Error fetching data:', error);
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

                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailPokemon;