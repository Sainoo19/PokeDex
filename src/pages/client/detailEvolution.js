import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import EvolutionList from '../../components/evolution/EvolutionList';
import PokemonFilter from '../../components/evolution/PokemonFilter';
import EvolutionInfo from '../../components/evolution/EvolutionInfo';


const DetailEvolution = () => {

    const typeToStyle = {
        Normal: "text-gray-800",
        Grass: "text-green-800",
        Electric: "text-yellow-800",
        Flying: "text-purple-800",
        Fire: "text-red-800",
        Water: "text-blue-800",
        Bug: "text-lime-800",
        Fairy: "text-pink-800",
        Fighting: "text-red-800",
        Psychic: "text-pink-800",
        Rock: "text-yellow-800",
        Ghost: "text-indigo-800",
        Ice: "text-cyan-800",
        Dragon: "text-blue-800",
        Dark: "text-gray-200",
        Steel: "text-gray-800",
        Poison: "text-purple-800",
        Ground: "text-brown-800",
        // Add more types if needed
    };

    const [pokemonList, setPokemonList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);


    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/evolution'); // Địa chỉ API của bạn
                const allPokemons = response.data;
                // Lưu vào state
                setPokemonList(allPokemons);
                setFilteredPokemons(allPokemons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchPokemonData();
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        // Lọc danh sách Pokémon dựa trên tên trong toàn bộ chuỗi tiến hóa
        const filtered = pokemonList.filter(pokemon =>
            pokemon.evolution_chain.some(evolution =>
                evolution.name.toLowerCase().includes(value)
            )
        );
        setFilteredPokemons(filtered);
    };



    

    return (
        <>
        <Header />
        <div className="font-sans bg-gray-100 min-h-screen">
            <div className="mt-20">
                <div className="container max-w-8xl mx-auto bg-white p-5 rounded shadow-md">
                    {/* <h1 className="text-4xl font-bold mb-4 text-center">Pokémon evolution guide</h1>
                    <div className='bg-gray-200 rounded p-4 text-base m-3'>
                        <p className='mb-4'>Below is a list of Pokémon grouped into their evolutionary chains for easy browsing. The charts also specify the conditions by which they evolve. Note that for most conditional evolutions (such as Friendship), the Pokémon needs to level up once the condition is met in order to evolve. You can quickly search for a Pokémon name using the box below, or use the menu below right to view evolutions by certain conditions.</p>
                        <p>Pokémon with cross-generation evolutions are shown in the earliest generation its Pokémon appear - for example Pichu is shown in Generation 1 because Pikachu/Raichu are Gen 1. Alolan Forms from Pokémon Sun & Moon are also listed in Generation 1, alongside their non-Alolan counterparts.</p>
                    </div>
                    <h2 className="text-3xl font-bold mt-4 text-center">About Pokémon evolution</h2>
                    <div className='pl-32 pr-32 mt-4 mb-4'>
                        <p className='mb-4'>Evolution is a key part of the Pokémon games. Evolving Pokémon makes them stronger and often gives them a wider movepool. Several species of Pokémon are only obtainable through evolution.</p>
                        <p className='mb-4'>There are several methods of evolution, with more variations being added with each game. In Red/Blue/Yellow, a Pokémon might evolve by training it to a certain <em>level</em>, applying an <em>elemental stone</em>, or <em>trading</em> via cable link.</p>
                        <p>In Gold/Silver/Crystal, additional methods were added, namely <em>friendship level</em> and <em>trading</em> with a held item. Later games added yet more based on things such as <em>gender</em>, <em>time of day</em> or after a certain <em>move</em> is learned.</p>
                    </div> */}


                    {/* <div className="flex items-center justify-center mb-4">
                            <p className="mr-2">Filter Pokémon:</p>
                            <input
                                type="text"
                                className="border border-gray-300 p-2 rounded w-56"
                                placeholder="Enter Pokémon name"
                                value={searchTerm}
                                onChange={handleInputChange}
                            />
                    </div> */}

                    <EvolutionInfo />
                    <PokemonFilter searchTerm={searchTerm} onInputChange={handleInputChange} />
                    <EvolutionList filteredPokemons={filteredPokemons} typeToStyle={typeToStyle} />
                </div>

            </div>

        </div>
        <Footer/>
        </>
    );
};

export default DetailEvolution;
