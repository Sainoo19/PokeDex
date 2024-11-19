import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/client/layout/Footer';
import FilterSidebar from '../../components/client/pokemon/SideBar';
import PokemonCard from '../../components/client/pokemon/Card';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typesData, setTypesData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pokemonResponse, typesResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/pokemon/all'),
                    axios.get('http://localhost:8080/api/type/types')
                ]);
                setPokemonData(pokemonResponse.data);
                setFilteredData(pokemonResponse.data);
                setTypesData(typesResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (filters) => {
        const { ability, types = [], height, weight, weakness } = filters;

        const filtered = pokemonData.filter(pokemon => {
            const matchesAbility = ability ? pokemon.abilities.some(abilityObj => abilityObj.name === ability) : true;
            const matchesTypes = Array.isArray(types) && types.length > 0 ? types.every(type => pokemon.type && pokemon.type.includes(type)) : true;
            const matchesHeight = height ? (
                (height === 'small' && pokemon.height <= 1) ||
                (height === 'medium' && pokemon.height > 1 && pokemon.height <= 3) ||
                (height === 'large' && pokemon.height > 3)
            ) : true;
            const matchesWeight = weight ? (
                (weight === 'small' && pokemon.weight < 100) ||
                (weight === 'medium' && pokemon.weight >= 100 && pokemon.weight <= 300) ||
                (weight === 'large' && pokemon.weight > 300)
            ) : true;
            const matchesWeakness = weakness ? pokemon.type.some(type => {
                const typeData = typesData.find(t => t.name === type);
                return typeData && typeData.weaknesses.includes(weakness);
            }) : true;

            return matchesAbility && matchesTypes && matchesHeight && matchesWeight && matchesWeakness;
        });

        setFilteredData(filtered);
    };

    const handleCardClick = (name) => {
        navigate(`/pokemon/${name}`);
    };

    return (
        <>
            <Header />
            <div className="flex mt-20">
                <FilterSidebar onFilterChange={handleFilterChange} />
                <div className="w-3/4 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <input type="text" placeholder="Search item" className="w-3/4 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500" />
                        <div className="text-gray-700">
                            Sort by : <a href="#" className="text-blue-500">A-Z</a>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 gap-3">
                        {filteredData.map(pokemon => (
                            <PokemonCard
                                key={pokemon._id}
                                name={pokemon.name}
                                type={pokemon.type}
                                imgSrc={`/assets/images/${pokemon.name}.png`}
                                onClick={() => handleCardClick(pokemon.name)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PokemonList;