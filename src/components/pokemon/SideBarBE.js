import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterSidebarBE = ({ onFilterChange }) => {
    const [abilities, setAbilities] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedAbility, setSelectedAbility] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedHeight, setSelectedHeight] = useState('');
    const [selectedWeight, setSelectedWeight] = useState('');
    const [selectedWeakness, setSelectedWeakness] = useState('');

    useEffect(() => {
        const fetchAbilities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/abilities/abilities');
                setAbilities(response.data);
            } catch (error) {
                console.error('Error fetching abilities:', error);
            }
        };

        const fetchTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/type/types');
                setTypes(response.data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchAbilities();
        fetchTypes();
    }, []);

    const handleTypeChange = (type) => {
        setSelectedTypes(prevSelectedTypes => {
            if (prevSelectedTypes.includes(type)) {
                return prevSelectedTypes.filter(t => t !== type);
            } else {
                return [...prevSelectedTypes, type];
            }
        });
    };

    const handleFilterChange = () => {
        onFilterChange({
            ability: selectedAbility,
            types: selectedTypes,
            height: selectedHeight,
            weight: selectedWeight,
            weakness: selectedWeakness,
        });
    };

    return (
        <div className="w-1/4 p-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Ability</label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-500 focus:text-white focus:border-red-500"
                    value={selectedAbility}
                    onChange={(e) => setSelectedAbility(e.target.value)}
                >
                    <option value="">Select Ability</option>
                    {abilities.map((ability) => (
                        <option key={ability._id} value={ability.name}>{ability.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Weakness</label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-500 focus:text-white focus:border-red-500"
                    value={selectedWeakness}
                    onChange={(e) => setSelectedWeakness(e.target.value)}
                >
                    <option value="">Select Weakness</option>
                    {types.map((type) => (
                        <option key={type._id} value={type.name}>{type.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Height</label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-500 focus:text-white focus:border-red-500"
                    value={selectedHeight}
                    onChange={(e) => setSelectedHeight(e.target.value)}
                >
                    <option value="">Select Height</option>
                    <option value="small">Small (1m)</option>
                    <option value="medium">Medium (1m - 3m)</option>
                    <option value="large">Large (3m)</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Weight</label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-500 focus:text-white focus:border-red-500"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                >
                    <option value="">Select Weight</option>
                    <option value="small">Small (100kg)</option>
                    <option value="medium">Medium (100kg - 300kg)</option>
                    <option value="large">Large (300kg)</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Type</label>
                <div className="grid grid-cols-2 gap-2">
                    {types.map(type => (
                        <label key={type._id} className="inline-flex items-center">
                            <input
                                type="checkbox"
                                className="h-5 w-5 bg-gray-300 border-2 border-gray-300 rounded-sm appearance-none checked:bg-red-600 checked:border-red-600 checked:before:block checked:before:w-2 checked:before:h-2 checked:before:bg-white checked:before:rounded-sm focus:ring-0"
                                checked={selectedTypes.includes(type.name)}
                                onChange={() => handleTypeChange(type.name)}
                            />
                            <span className="ml-2 text-gray-700">{type.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-4">
                <button
                    className="w-full bg-white text-red-600 py-2 px-4 rounded border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300"
                    onClick={handleFilterChange}
                >
                    Apply Filters
                </button>
            </div>

            <div>
                <button
                    className="w-full bg-white text-red-600 border border-gray-300 py-2 px-4 rounded hover:bg-red-600 hover:text-white transition-colors duration-300"
                    onClick={() => {
                        setSelectedAbility('');
                        setSelectedTypes([]);
                        setSelectedHeight('');
                        setSelectedWeight('');
                        setSelectedWeakness('');
                        handleFilterChange();
                    }}
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default FilterSidebarBE;