import React from 'react';
import { useState, useEffect } from 'react';

const Header = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="bg-white shadow-md fixed top-0 w-full z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="https://placehold.co/40x40" alt="Pokémon logo" className="mr-2" />
                    <h1 className="text-xl font-bold">Pokémondex</h1>
                </div>
                <nav className={`space-x-4 ${isMobile ? 'hidden' : 'block'}`}>
                    <a href="/pokemons" className="text-gray-700">Pokémon Data</a>
                    {/* evolution */}
                    <a href="/evolution" className="text-gray-700">Evolution</a>
                    
                    <a href="/moves" className="text-gray-700">Moves</a>
                    <a href="/login" className="text-gray-700">Login</a>
                </nav>
                <button className={`block ${isMobile ? 'block' : 'hidden'}`} onClick={() => setIsMobile(!isMobile)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
            {isMobile && (
                <div className="container mx-auto px-4 py-4">
                    <nav className="space-y-4">
                        <a href="/pokemons" className="block text-gray-700">Pokémon Data</a>
                        <a href="/evolution" className="block text-gray-700">Evolution</a>
                        <a href="/moves" className="block text-gray-700">Moves</a>
                        <a href="/login" className="block text-gray-700">Login</a>
                    </nav>
                </div>
            )}
        </header>
    );
};
export default Header;