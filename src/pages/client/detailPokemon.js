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
    const [evolutions, setEvolutions] = useState([]); // Thêm state cho chuỗi tiến hóa
    const [moves, setMoves] = useState([]); // Thêm state cho moves

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [pokemonResponse, typeResponse, weaknessesResponse, evolutionResponse, movesResponse] = await Promise.all([
                    axios.get(`http://localhost:8080/api/pokemon/${name}`),
                    axios.get(`http://localhost:8080/api/pokemon/type/${name}`),
                    axios.get(`http://localhost:8080/api/pokemon/${name}/weaknesses`),
                    axios.get(`http://localhost:8080/api/evolution/${name}`), // Thêm API gọi chuỗi tiến hóa
                    axios.get(`http://localhost:8080/api/pokemon/${name}/moves`) // Gọi API moves
                ]);

                setPokemon(pokemonResponse.data);
                setWeaknesses(typeResponse.data);

                setWeaknesses(weaknessesResponse.data.weaknesses);
                setEvolutions(evolutionResponse.data.evolution_chain); // Cập nhật dữ liệu chuỗi tiến hóa
                setMoves(movesResponse.data.moves); // Lưu moves vào state

                console.log('Pokemon Data:', pokemonResponse.data);
                console.log('Weaknesses Response:', weaknessesResponse.data);
                console.log('Evolution Chain:', evolutionResponse.data); // Kiểm tra dữ liệu chuỗi tiến hóa
                console.log('Moves:', movesResponse.data.moves); // Kiểm tra dữ liệu moves

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

                    {/* Truyền dữ liệu chuỗi tiến hóa vào component Evolutions */}
                    <Evolutions evolutions={evolutions} />
                    
                    <div className="mt-4">
                    <p className="mb-2"><strong>Moves:</strong></p>
                        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Type</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Power</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Accuracy</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">PP</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {moves.length > 0 ? (
                                        moves.map((move, index) => (
                                            <tr key={index} className="border-t hover:bg-gray-50">
                                                <td className="px-4 py-2 text-sm text-blue-600 font-bold">{move.name}</td> {/* Thêm lớp màu xanh dương cho cột Name */}
                                                <td className="px-4 py-2 text-sm text-gray-600">{move.type}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{move.power}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{move.accuracy}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{move.pp}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{move.description}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-4 py-2 text-center text-gray-500">No moves available for this Pokémon</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <ExploreButton />

                </div>
            </div>
            <Footer />
        </>
    );
};

export default DetailPokemon;
