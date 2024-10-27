import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { type } from "@testing-library/user-event/dist/type";

const typeImages = {
    normal: './assets/images/typeImages/Normal.png',
    bug: './assets/images/typeImages/bug.png',
    dark: './assets/images/typeImages/dark.png',
    dragon: './assets/images/typeImages/dragon.png',
    electric: './assets/images/typeImages/electric.png',
    fairy: './assets/images/typeImages/fairy.png',
    fighting: './assets/images/typeImages/fighting.png',
    fire: './assets/images/typeImages/fire.png',
    flying: './assets/images/typeImages/flying.png',
    ghost: './assets/images/typeImages/ghost.png',
    grass: './assets/images/typeImages/grass.png',
    ground: './assets/images/typeImages/ground.png',
    ice: './assets/images/typeImages/ice.png',
    poison: './assets/images/typeImages/poison.png',
    psychic: './assets/images/typeImages/Psychic.png',
    rock: './assets/images/typeImages/Rock.png',
    steel: './assets/images/typeImages/Steel.png',
    water: './assets/images/typeImages/Water.png',
}

const Move = () => {
    const [moves, setMoves] = useState([]);
    const [nameDropdown, setNameDropdown] = useState(false); //Dropdown cột name
    const [powerDropDown, setPowerDropDown] = useState(false);
    const [accDropDown, setAccDropDown] = useState(false);
    const [ppDropDown, setPpDropDown] = useState(false); 
    const [sortConfig, setSortConfig] = useState({key: '', direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState(''); //lưu giá trị mà người dùng nhập vào
    const [filteredMoves, setFilteredMoves] = useState([]); //lưu danh sách đã lọc
    const [selectedType, setSelectedType] = useState('All');

    const toggleDropdown = (column) => {
        setNameDropdown(column === 'name' ? !nameDropdown : false);
        setPowerDropDown(column === 'power' ? !powerDropDown : false);
        setAccDropDown(column === 'acc' ? !accDropDown : false);
        setPpDropDown(column === 'pp' ? !ppDropDown : false);
    };

    const handleSort = (key) => {
        let direction = 'ascending'
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        setSortConfig({ key, direction });
        //Đóng dropdown sau khi chọn
        setNameDropdown(false);
        setPowerDropDown(false);
        setAccDropDown(false);
        setPpDropDown(false);

        const sortedMoves = [...moves].sort((a, b) => {
            if(key === 'name') {
                return direction === 'ascending' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (key === 'power' || key === 'accuracy' || key === 'pp') {
                return direction === 'ascending' ? a[key] - b[key] : b[key] - a[key];
            }
            return 0;
        });
        setFilteredMoves(sortedMoves); //Cập nhật lại state với dữ liệu vừa sắp xếp
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
        setSelectedType(type);

        const filtered = moves.filter(move => {
            const matchesSearchTerm = move.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'All' || move.type === type;
            return matchesSearchTerm && matchesType;
        });
        setFilteredMoves(filtered);
    }

    //Gọi API
    useEffect(() => {
        const fetchMoves = async () => {
            try{
                const respone = await axios.get('http://localhost:8080/api/moves');
                console.log(respone.data);
                setMoves(respone.data);
                setFilteredMoves(respone.data);
            } catch (error) {
                console.error("Error fetching moves data:", error);
            }
        };
        fetchMoves();
    }, []);

    useEffect(() => {
        const filtered = moves.filter(move => {
            const matchesSearchTerm = move.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = selectedType === 'All' || move.type === selectedType;
            return matchesSearchTerm && matchesType;
        });
        setFilteredMoves(filtered);
    }, [searchTerm, moves, selectedType]);

    return(
        <>
            <Header/>
            <div className="mt-20"></div>
            <main className="flex-grow">
                <h1 className="text-4xl font-bold pt-4 flex items-center justify-center">Pokémon moves from Generation 1</h1>
                <div className="bg-neutral-200 border rounded p-4 mb-4 mt-6 mx-6 block">
                    <p className="mb-4">Below is the list of Pokémon attacks that were introduced in Generation 1 (Red, Blue, Yellow).</p>
                    <p>Click a move name to see even more detailed information, including which Pokémon can learn that move. You can click a column heading to instantly sort by that column, or filter on move name, type and category using the options provided.</p>
                </div>

                <div className="flex items-center justify-center m-4">
                    <label htmlFor="filter-move-name">Name/Effect:</label>
                    <input id="filter-move-name" 
                        type="text" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name"
                        className="w-60 h-10 border border-neutral-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 ml-3"
                    />
                    {/* <label htmlFor="filter-move-type" className="ml-5">Type:</label>
                    <select id="filter-move-type"
                            value={selectedType}
                            onChange={handleTypeChange} 
                            className="w-24 h-10 border border-neutral-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 ml-3"
                            required>
                        <option value=''>- All -</option>
                        <option value='normal'>Normal</option>
                        <option value='fire'>Fire</option>
                        <option value='water'>Water</option>
                        <option value='electric'>Electric</option>
                        <option value='grass'>Grass</option>
                        <option value='ice'>Ice</option>
                        <option value='fighting'>Fighting</option>
                        <option value='poison'>Poison</option>
                        <option value='ground'>Ground</option>
                        <option value='flying'>Flying</option>
                        <option value='psychic'>Psychic</option>
                        <option value='bug'>Bug</option>
                        <option value='rock'>Rock</option>
                        <option value='ghost'>Ghost</option>
                        <option value='dragon'>Dragon</option>
                        <option value='dark'>Dark</option>
                        <option value='steel'>Steel</option>
                        <option value='fairy'>Fairy</option>
                    </select> */}
                    {/* <label htmlFor="filter-move-category" className="ml-5">Category:</label>
                    <select id="filter-move-category"
                            className="w-24 h-10 border border-neutral-300 rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 ml-3"
                            required>
                        <option value=''>- All -</option>
                        <option value='physical'>Physical</option>
                        <option value='special'>Special</option>
                        <option value='status'>Satus</option>
                    </select> */}
                </div>

                <div className="border border-neutral-300 mb-4 mx-6 text-lg">
                    <table className="w-full table-auto border-collapse">
                        <thead>
                            <tr className="h-10 bg-neutral-200">
                                <th className="w-44 text-left px-2 border border-neutral-300 border-l-0 cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span>Name</span> 
                                        <div onClick={() => toggleDropdown('name')} className="relative cursor-pointer">
                                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 cursor-pointer " title="Sort" />
                                            {nameDropdown && (
                                                <div className="absolute right-0 mt-1 min-w-[130px] bg-white border-gray-300 rounded shadow-lg z-10">
                                                    <div onClick={() => handleSort("name")} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Sort to A-Z</div>
                                                    <div onClick={() => handleSort("name")} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Sort to Z-A</div>
                                                </div>
                                            )}
                                        </div>
                                        
                                    </div>
                                </th>
                                <th className="w-21 text-left px-2 border border-neutral-300">
                                    <div>Type</div>
                                </th>
                                <th className="w-13 text-left px-2 border border-neutral-300">
                                    <div className="flex items-center justify-between">
                                        Cat.
                                    </div>
                                </th>
                                <th className="w-21 text-left px-2 border border-neutral-300">
                                    <div className="flex items-center justify-between">
                                        <span>Power</span> 
                                        <div onClick={() => toggleDropdown('power')} className="relative cursor-pointer">
                                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 cursor-pointer" title="Sort" />
                                            {powerDropDown && (
                                                <div className="absolute right-0 mt-1 bg-white border-gray-300 rounded shadow-lg z-10">
                                                    <div onClick={() => handleSort("power", 'ascending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Ascending</div>
                                                    <div onClick={() => handleSort("power", 'descending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Descending</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </th>
                                <th className="w-17 text-left px-2 border border-neutral-300">
                                    <div className="flex items-center justify-between">
                                        <span>Acc.</span> 
                                        <div onClick={() => toggleDropdown('acc')} className="relative cursor-pointer">
                                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 cursor-pointer" title="Sort" />
                                                {accDropDown && (
                                                    <div className="absolute right-0 mt-1 bg-white border-gray-300 rounded shadow-lg z-10">
                                                        <div onClick={() => handleSort("accuracy", 'ascending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Ascending</div>
                                                        <div onClick={() => handleSort("accuracy", 'descending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Descending</div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </th>
                                <th className="w-15 text-left px-2 border border-neutral-300">
                                    <div className="flex items-center justify-between">
                                        <span>PP</span>
                                        <div onClick={() => toggleDropdown('pp')} className="relative cursor-pointer">
                                            <FontAwesomeIcon icon={faChevronDown} className="text-gray-500 cursor-pointer" title="Sort" />
                                                {ppDropDown && (
                                                    <div className="absolute right-0 mt-1 bg-white border-gray-300 rounded shadow-lg z-10">
                                                        <div onClick={() => handleSort("pp", 'ascending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Ascending</div>
                                                        <div onClick={() => handleSort("pp", 'descending')} className="px-4 py-2 cursor-pointer hover:bg-gray-100" style={{fontWeight: 'normal'}}>Descending</div>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </th>
                                <th className="w-62 text-left px-2 border border-neutral-300 border-r-0">
                                    <div>Effect</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {console.log(moves)}
                            {filteredMoves.map(move => {
                                console.log(move.type); // In ra loại để kiểm tra
                                return (
                                    <tr key={move._id} className="border border-l-0 border-gray-300 hover:bg-fuchsia-100">
                                        <td className="w-44 h-12 text-left px-2 font-semibold text-blue-600">
                                            <a href={`/move/${move.id}`} className="font-semibold hover:text-blue-500">{move.name}</a>
                                        </td>
                                        <td className="text-center">{move.type}</td>
                                        <td className="flex justify-center items-center h-12">
                                            <img src={typeImages[move.type.toLowerCase()]} 
                                            alt={move.type} 
                                            className="w-8 h-8 object-contain"/>
                                        </td>
                                        <td className="text-center">{move.power}</td>
                                        <td className="text-center">{move.accuracy}</td>
                                        <td className="text-center">{move.pp}</td>
                                        <td className="text-left px-2">{move.description}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
            </div>

            </main>
            <Footer/>
        </>
    );
}

export default Move;