import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import FilterSidebarBE from '../../components/pokemon/SideBarBE';
import PokemonCard from '../../components/pokemon/Card';
import Pagination from '../../components/layout/Pagination';

const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typesData, setTypesData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({});
    const [searchQuery, setSearchQuery] = useState("");  // Thêm state cho search query
    const navigate = useNavigate();

    const fetchData = async (page = 1, filters = {}, searchQuery = "") => {
        try {
            // Kiểm tra xem có bộ lọc nào và thêm search query vào
            const params = {
                page,
                limit: 15,
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
                setTotalPages(Math.ceil(totalCount / 15));
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
            <div className="flex mt-20">
                <FilterSidebarBE onFilterChange={handleFilterChange} />
                <div className="w-3/4 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search item"
                            className="w-3/4 bg-gray-100 border border-gray-300 text-gray-700 py-2 px-4 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                            onChange={debouncedSearch}  // Gọi debouncedSearch khi người dùng nhập
                        />
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
