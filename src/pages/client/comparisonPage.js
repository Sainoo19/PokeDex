import React, { useState } from 'react';
import PokemonCardList from '../../components/client/pokemon/CardAndList';
import Comparison from '../../components/client/pokemon/Comparison';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/client/layout/Footer';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ComparisonPage() {
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);
    const [view, setView] = useState('table'); // Default view is table

    return (
        <>
            <Header />
            <div className="mt-20"></div>
            <div className="flex flex-col items-center min-h-screen">
                <div className="flex flex-col lg:flex-row justify-center items-center space-x-8 mt-8 w-full">
                    <div className="flex flex-col items-center w-full lg:w-1/2 p-4">
                        <PokemonCardList selectedPokemon={pokemon1} onSelect={setPokemon1} />
                        {pokemon1 && (
                            <div className="mt-4 w-full max-w-xs">
                                <h3 className="text-xl font-bold">Base Stats</h3>
                                {view === 'table' && (
                                    <table className="table-auto w-full">
                                        <thead className="bg-red-500 text-white">
                                            <tr>
                                                <th className="px-4 py-2">Stat</th>
                                                <th className="px-4 py-2">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-orange-100 text-black">
                                            {Object.entries(pokemon1.base_stats).map(([stat, value]) => (
                                                <tr key={stat}>
                                                    <td className="border px-4 py-2">{stat.toUpperCase()}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {view === 'bar' && (
                                    <Bar
                                        data={{
                                            labels: Object.keys(pokemon1.base_stats).map(stat => stat.toUpperCase()),
                                            datasets: [
                                                {
                                                    label: pokemon1.name,
                                                    data: Object.values(pokemon1.base_stats),
                                                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                                                    borderColor: 'rgba(75, 192, 192, 1)',
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            indexAxis: 'y',
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Base Stats',
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    beginAtZero: true,
                                                },
                                                y: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className="text-3xl font-bold">VS</div>
                    <div className="flex flex-col items-center w-full lg:w-1/2 p-4">
                        <PokemonCardList selectedPokemon={pokemon2} onSelect={setPokemon2} />
                        {pokemon2 && (
                            <div className="mt-4 w-full max-w-xs">
                                <h3 className="text-xl font-bold">Base Stats</h3>
                                {view === 'table' && (
                                    <table className="table-auto w-full">
                                        <thead className="bg-red-500 text-white">
                                            <tr>
                                                <th className="px-4 py-2">Stat</th>
                                                <th className="px-4 py-2">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-orange-100 text-black">
                                            {Object.entries(pokemon2.base_stats).map(([stat, value]) => (
                                                <tr key={stat}>
                                                    <td className="border px-4 py-2">{stat.toUpperCase()}</td>
                                                    <td className="border px-4 py-2">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                {view === 'bar' && (
                                    <Bar
                                        data={{
                                            labels: Object.keys(pokemon2.base_stats).map(stat => stat.toUpperCase()),
                                            datasets: [
                                                {
                                                    label: pokemon2.name,
                                                    data: Object.values(pokemon2.base_stats),
                                                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                                    borderColor: 'rgba(255, 99, 132, 1)',
                                                    borderWidth: 1,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            indexAxis: 'y',
                                            plugins: {
                                                legend: {
                                                    position: 'top',
                                                },
                                                title: {
                                                    display: true,
                                                    text: 'Base Stats',
                                                },
                                            },
                                            scales: {
                                                x: {
                                                    beginAtZero: true,
                                                },
                                                y: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                    <button onClick={() => setView('table')} className="px-4 py-2 bg-red-500 text-white rounded">Table</button>
                    <button onClick={() => setView('bar')} className="px-4 py-2 bg-red-500 text-white rounded">Bar Chart</button>
                </div>
                <Comparison pokemon1={pokemon1} pokemon2={pokemon2} view={view} />
            </div>
            <Footer />
        </>
    );
}

export default ComparisonPage;