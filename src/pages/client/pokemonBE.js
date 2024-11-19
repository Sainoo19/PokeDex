import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Header from '../../components/client/layout/Header';
import Footer from '../../components/client/layout/Footer';
import FilterSidebarBE from '../../components/client/pokemon/SideBarBE';
import PokemonCard from '../../components/client/pokemon/Card';
import Pagination from '../../components/client/layout/Pagination';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typesData, setTypesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho search query
    const navigate = useNavigate();

    const getLimit = () => {
        if (window.innerWidth >= 1024) {
            return 15; // PC and Laptop
        } else {
            return 14; // Mobile and Tablet
        }
    };

    const fetchData = async (page = 1, filters = {}, searchQuery = "") => {
        try {
            const limit = getLimit();
            const params = {
                page,
                limit,
                ...filters,
                search: searchQuery // Truyền tham số tìm kiếm vào API
            };

            const [pokemonResponse, typesResponse] = await Promise.all([
                axios.get('http://localhost:8080/api/pokemon/all', { params }),
                axios.get('http://localhost:8080/api/type/types')
            ]);

            setPokemonData(pokemonResponse.data);
            setFilteredData(pokemonResponse.data);
            setTypesData(typesResponse.data);

            const totalCount = parseInt(pokemonResponse.headers['x-total-count'], 10);
            if (!isNaN(totalCount)) {
                setTotalPages(Math.ceil(totalCount / limit));
            } else {
                setTotalPages(1);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(currentPage, filters, searchQuery);
    }, [currentPage, filters, searchQuery]);  // Thêm searchQuery vào dependency

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset trang khi bộ lọc thay đổi
    };

    const handleCardClick = (name) => {
        navigate(`/pokemon/${name}`);
    };

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Xử lý sự kiện khi người dùng nhập tìm kiếm
    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);  // Cập nhật searchQuery
    };

    // Sử dụng debounce để gọi API sau khi người dùng ngừng gõ trong 2 giây
    const debouncedSearch = debounce(handleSearchChange, 1000);

    return (
        <>
            <Header />
            <div className="flex flex-col lg:flex-row mt-20">
                <FilterSidebarBE onFilterChange={handleFilterChange} className="w-full lg:w-1/4" />
                <div className="w-full lg:w-3/4 p-4">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search item"
                            className="w-full md:w-3/4 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={debouncedSearch}  // Gọi debouncedSearch khi người dùng nhập
                        />
                        <div className="text-gray-700 mt-4 md:mt-0">
                            Sort by : <a href="#" className="text-blue-500">A-Z</a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {filteredData.map(pokemon => {
                            const imgSrc = `/assets/images/${pokemon.name.replace(/'/g, '_')}.png`;
                            return (
                                <PokemonCard
                                    key={pokemon._id}
                                    name={pokemon.name}
                                    type={pokemon.type}
                                    imgSrc={imgSrc}
                                    onClick={() => handleCardClick(pokemon.name)}
                                />
                            );
                        })}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PokemonList;