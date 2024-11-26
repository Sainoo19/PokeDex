import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/layout/SideBar';
import Footer from '../../components/admin/layout/Footer';
import Pagination from '../../components/admin/layout/Pagination';

//Thư note B3
import UseFormValidation from '../../components/admin/validation/UseFormValidationForEdit';
import EditPokemon from '../../components/admin/layout/EditPokemon';
const AdminPokemon = ({onOpen}) => {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    // Thư note B3
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Thư note B3 Khi modal mở, ngừng cuộn trang chính
    useEffect(() => {
        if (isModalOpen) {
        document.body.style.overflow = "hidden"; // Khóa cuộn của trang Home
        } else {
        document.body.style.overflow = "auto"; // Mở cuộn trang Home khi đóng modal
        }

        // Clean up khi component unmount
        return () => {
        document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);
    //const handleOpenModal = () => setIsModalOpen(true);
    const handleOpenModal = (pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    }
	//Thư note B3 - không bị reload từ đầu
    const handleCloseModal = (shouldRefresh = false) => {
        console.log("Modal đóng");
        setIsModalOpen(false);
        setSelectedPokemon(null);
        if (shouldRefresh) {
            fetchData(currentPage, searchQuery);
        }
    };
    const getLimit = () => {
        return 10; // Set limit to 10 for all screen sizes
    };

    const fetchData = async (page = 1, searchQuery = "") => {
        try {
            const limit = getLimit();
            const params = {
                page,
                limit,
                search: searchQuery
            };

            const response = await axios.get('http://localhost:8080/api/pokemon/all', { params });
            setPokemonData(response.data);

            const totalCount = parseInt(response.headers['x-total-count'], 10);
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
        fetchData(currentPage, searchQuery);
    }, [currentPage, searchQuery]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    return (
        <div className="flex">
            <SideBar />
            <div className="flex-1 p-8 bg-gray-100">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">Pokemon Management</h1>
                <nav className="mb-4">
                    <ol className="list-reset flex text-gray-600">
                        <li><a href="#" className="text-blue-600 hover:text-blue-800 transition duration-300">Home</a></li>
                        <li><span className="mx-2">/</span></li>
                        <li className="text-gray-800">Pokemon Management</li>
                    </ol>
                </nav>
                <div className="mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            placeholder="Search Pokemon..."
                            className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            onChange={handleSearchChange}
                        />
                        <button className="bg-white text-red-600 border-2 border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition duration-300">
                            <span className="font-semibold">+ Add Pokemon</span>
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-6 border-b">Name</th>
                            <th className="py-3 px-6 border-b">Type</th>
                            <th className="py-3 px-6 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonData.map(pokemon => (
                            <tr key={pokemon._id} className="hover:bg-gray-100 transition duration-200">
                                <td className="py-3 px-6 border-b">{pokemon.name}</td>
                                <td className="py-3 px-6 border-b">{pokemon.type.join('/')}</td>
                                <td className="py-3 px-6 border-b flex justify-center space-x-2">
                                    <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200">View</button>
                                    <button 
                                        className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition duration-200"
                                         //  Thư note B3 
                                        onClick={() => handleOpenModal(pokemon)} 
                                    >
                                        <span>Edit</span> 
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                    {/* Thư note B3 */}
                    {isModalOpen && (
                        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="modal-container bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80vh] overflow-y-auto">
                                
                            <EditPokemon 
                                pokemon={selectedPokemon} 
                                onCancel={() => handleCloseModal(false)}
                                onSave={() => handleCloseModal(true)}
                            />
                            </div>
                        </div>
                    )}
                </table>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
                <Footer />
            </div>
        </div>
    );
};

export default AdminPokemon;