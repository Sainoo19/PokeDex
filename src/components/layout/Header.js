import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Kiểm tra kích thước cửa sổ khi load trang

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="bg-white shadow-md shadow-red-500 fixed top-0 w-full z-10">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div
                    className="flex items-center cursor-pointer transition-transform duration-300 transform hover:scale-110"
                    onClick={() => window.location.href = '/'} // Điều hướng về trang chủ
                >
                    <img src="https://placehold.co/40x40" alt="Pokémon logo" className="mr-2 rounded-full shadow-lg" />
                    <h1 className="text-2xl font-extrabold tracking-wide hover:text-red-500">Pokémondex</h1>
                </div>



                {/* Nav Links for larger screens */}
                <nav className={`space-x-6 ${isMobile ? 'hidden' : 'block'}`}>
                    <a href="/pokemon/all" className="text-lg hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Pokémon Data</a>
                    <a href="/moves" className="text-lg hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Moves</a>
                    <a href="/evolution" className="text-lg hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Evolution</a>
                    <a href="/login" className="text-lg hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Login</a>

                </nav>

                {/* Mobile Menu Button */}
                <button
                    className={`block ${isMobile ? 'block' : 'hidden'}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Links (Dropdown) with animation */}
            {isMobile && menuOpen && (
                <div className="bg-white border-t-4 border-red-500 container mx-auto px-6 py-4 mt-2 rounded-lg shadow-lg transition-transform transform duration-500 ease-in-out">
                    <nav className="space-y-4">

                        <a href="/pokemon/all" className="block text-lg text-gray-700 hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Pokémon Data</a>
                        <a href="/moves" className="block text-lg text-gray-700 hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Moves</a>
                        <a href="/evolution" className="block text-lg text-gray-700 hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Evolution</a>
                        <a href="/login" className="block text-lg text-gray-700 hover:text-red-500 hover:text-2xl hover:font-bold transition-all duration-300">Login</a>

                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
