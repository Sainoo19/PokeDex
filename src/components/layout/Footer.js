import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white border-t-4 border-red-500 shadow-md shadow-red-500 text-gray-700 py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Thông tin chính */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold mb-4">PokeDex</h2>
                    <p className="text-sm mb-4">Your ultimate guide to the Pokémon world!</p>
                    <p className="text-sm">&copy; 2023 PokeDex. All rights reserved.</p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-4">Reference</h3>
                    <ul>
                        <li><a href="#" className="text-lg transition-all duration-300 transform hover:text-red-500 hover:font-semibold hover:text-xl">Home</a></li>
                        <li><a href="#" className="text-lg transition-all duration-300 transform hover:text-red-500 hover:font-semibold hover:text-xl">About</a></li>
                        <li><a href="#" className="text-lg transition-all duration-300 transform hover:text-red-500 hover:font-semibold hover:text-xl">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#" className="text-3xl transition-all duration-300 transform hover:text-red-500 hover:font-bold hover:text-4xl">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-3xl transition-all duration-300 transform hover:text-red-500 hover:font-bold hover:text-4xl">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-3xl transition-all duration-300 transform hover:text-red-500 hover:font-bold hover:text-4xl">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
