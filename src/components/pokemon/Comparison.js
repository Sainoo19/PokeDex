import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Comparison({ pokemon1, pokemon2, view }) {
    const [typeData, setTypeData] = useState(null);

    useEffect(() => {
        const fetchTypeData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/type/types');
                setTypeData(response.data);
            } catch (error) {
                console.error('Error fetching type data:', error);
            }
        };

        fetchTypeData();
    }, []);

    if (!pokemon1 || !pokemon2 || !pokemon1.base_stats || !pokemon2.base_stats || !typeData) return null;

    const stats = Object.keys(pokemon1.base_stats);
    const pokemon1Stats = stats.map(stat => pokemon1.base_stats[stat]);
    const pokemon2Stats = stats.map(stat => pokemon2.base_stats[stat]);

    const data = {
        labels: stats.map(stat => stat.toUpperCase()),
        datasets: [
            {
                label: pokemon1.name,
                data: pokemon1Stats,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: pokemon2.name,
                data: pokemon2Stats,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pokémon Base Stats Comparison',
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
    };

    const compareStats = () => {
        let pokemon1Wins = 0;
        let pokemon2Wins = 0;
        const comparisonResults = stats.map(stat => {
            const stat1 = pokemon1.base_stats[stat];
            const stat2 = pokemon2.base_stats[stat];
            let result;
            if (stat1 > stat2) {
                pokemon1Wins++;
                result = `${pokemon1.name} has ${stat1 - stat2} more ${stat.toUpperCase()}`;
            } else if (stat1 < stat2) {
                pokemon2Wins++;
                result = `${pokemon2.name} has ${stat2 - stat1} more ${stat.toUpperCase()}`;
            } else {
                result = `Both have equal ${stat.toUpperCase()}`;
            }
            return result;
        });

        // Check type effectiveness
        const pokemon1Types = pokemon1.type;
        const pokemon2Types = pokemon2.type;

        let typeEffectivenessResult = '';
        let typeEffectivenessWinner = '';

        pokemon1Types.forEach(type1 => {
            const type1Data = typeData.find(t => t.name === type1);
            if (type1Data) {
                pokemon2Types.forEach(type2 => {
                    if (type1Data.weaknesses.includes(type2)) {
                        typeEffectivenessResult = `${pokemon2.name} has a type advantage over ${pokemon1.name}`;
                        typeEffectivenessWinner = pokemon2.name;
                    } else if (type1Data.resistances.includes(type2)) {
                        typeEffectivenessResult = `${pokemon1.name} has a type advantage over ${pokemon2.name}`;
                        typeEffectivenessWinner = pokemon1.name;
                    }
                });
            }
        });

        let summary;
        if (pokemon1Wins > pokemon2Wins) {
            summary = `${pokemon1.name} is stronger with ${pokemon1Wins} winning criteria.`;
        } else if (pokemon1Wins < pokemon2Wins) {
            summary = `${pokemon2.name} is stronger with ${pokemon2Wins} winning criteria.`;
        } else {
            summary = 'Both Pokémon are equally strong.';
        }

        if (typeEffectivenessWinner) {
            summary += ` Additionally, ${typeEffectivenessWinner} has a type advantage.`;
        }

        // Determine overall winner
        let overallWinner;
        if (typeEffectivenessWinner === pokemon1.name) {
            pokemon1Wins += 3;
        } else if (typeEffectivenessWinner === pokemon2.name) {
            pokemon2Wins += 3;
        }

        if (pokemon1Wins > pokemon2Wins) {
            overallWinner = `${pokemon1.name} wins overall with ${pokemon1Wins} total criteria.`;
        } else if (pokemon1Wins < pokemon2Wins) {
            overallWinner = `${pokemon2.name} wins overall with ${pokemon2Wins} total criteria.`;
        } else {
            overallWinner = 'Both Pokémon are equally strong overall.';
        }

        return { comparisonResults, summary, typeEffectivenessResult, typeEffectivenessWinner, overallWinner };
    };

    const { comparisonResults, summary, typeEffectivenessResult, typeEffectivenessWinner, overallWinner } = compareStats();

    return (
        <div className="text-center mt-8 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Comparison</h2>
            {view === 'table' && (
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Stat</th>
                            <th className="px-4 py-2">{pokemon1.name}</th>
                            <th className="px-4 py-2">{pokemon2.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats.map(stat => (
                            <tr key={stat}>
                                <td className="border px-4 py-2">{stat.toUpperCase()}</td>
                                <td className="border px-4 py-2">{pokemon1.base_stats[stat]}</td>
                                <td className="border px-4 py-2">{pokemon2.base_stats[stat]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {view === 'bar' && <Bar data={data} options={options} />}
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Detailed Comparison</h3>
                <ul className="list-disc list-inside bg-gray-100 p-4 rounded-lg shadow-md">
                    {comparisonResults.map((result, index) => (
                        <li key={index} className="mb-2 text-left">{result}</li>
                    ))}
                </ul>
                {typeEffectivenessResult && (
                    <div className="mt-4 bg-yellow-100 p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold">Type Effectiveness</h3>
                        <p>{typeEffectivenessResult}</p>
                    </div>
                )}
                <h3 className="text-xl font-bold mt-4">Summary</h3>
                <p className={`p-4 rounded-lg shadow-md ${typeEffectivenessWinner ? 'bg-green-100' : 'bg-blue-100'}`}>{summary}</p>
                <p className={`p-4 rounded-lg shadow-md ${typeEffectivenessWinner ? 'bg-green-100' : 'bg-blue-100'}`}>Overall Winner: {overallWinner}</p>
                <div className="mb-4"></div>

            </div>
        </div>
    );
}

export default Comparison;