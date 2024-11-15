import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import PokemonCard from '../../components/pokemon/Card';

const Homepage = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [topPokemonData, setTopPokemonData] = useState([]); // State cho dữ liệu từ API khác
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pokemonResponse, topPokemonResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/pokemon/random'),
                    axios.get('http://localhost:8080/api/pokemon/top-attack'), // URL API khác
                ]);

                setPokemonData(pokemonResponse.data);
                setTopPokemonData(topPokemonResponse.data); // Cập nhật state cho dữ liệu khác
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (name) => {
        navigate(`/pokemon/${name}`);
    };

    return (
        <>
            <Header />
            <div className="mt-20"></div> {/* Adjusted margin to create space between header and main content */}
            <main className="container mx-auto px-4 py-8">
                <section className="mb-5 mx-2">
                    <div className="relative bg-cover bg-center h-128 w-full rounded-lg overflow-hidden" style={{ backgroundImage: "url('/assets/images/background/banner.png')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                            <h2 className="text-3xl font-bold mb-2">New Event Is Coming Soon</h2>
                            <p className="text-lg">Join the special collection event to discover and gather rare items, unlock exciting rewards</p>
                            <div className="mt-4">
                                <i className="fas fa-circle text-white mx-1"></i>
                                <i className="fas fa-circle text-white mx-1"></i>
                                <i className="fas fa-circle text-white mx-1"></i>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h2 className="text-2xl font-bold mb-4 mt-4">Top Pokémon</h2>
                    <div className="grid grid-cols-7 gap-3">
                        {pokemonData.map(pokemon => (
                            <PokemonCard
                                key={pokemon._id}
                                name={pokemon.name}
                                type={pokemon.type}
                                imgSrc={`/assets/images/${pokemon.name}.png`}
                                onClick={() => handleCardClick(pokemon.name)}
                            />
                        ))}
                    </div>
                    <h2 className="text-2xl font-bold mb-4 mt-2">Pokémon Of The Day</h2>
                    <div className="grid grid-cols-7 gap-3">
                        {topPokemonData.map(pokemon => (
                            <PokemonCard
                                key={pokemon._id}
                                name={pokemon.name}
                                type={pokemon.type}
                                imgSrc={`/assets/images/${pokemon.name}.png`}
                                onClick={() => handleCardClick(pokemon.name)}
                            />
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Homepage;