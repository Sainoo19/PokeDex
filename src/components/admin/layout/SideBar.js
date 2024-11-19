import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SideBar = () => {
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setMenuItems([
            { name: 'Pokemon', route: '/admin/pokemon' },
            { name: 'Move', route: '/admin/move' },
            { name: 'Ability', route: '/admin/ability' },
            { name: 'Item', route: '/admin/item' },
            { name: 'Type', route: '/admin/type' }
        ]);
    }, []);

    const handleNavigation = (route) => {
        navigate(route);
    };

    return (
        <div className="flex">
            <div className="w-64 bg-black text-white shadow-md p-5 flex flex-col space-y-4 fixed h-full">
                <div className="text-2xl font-bold text-center text-white-400 mb-6">
                    {/* Tên hoặc logo sidebar */}
                    <h1>PokeDex</h1>
                </div>
                <ul className="space-y-2">
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            className="p-2 rounded-md bg-black text-white hover:bg-red-600 hover:text-white transition duration-200 cursor-pointer"
                            onClick={() => handleNavigation(item.route)}
                        >
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-1 bg-gray-100 p-8 ml-64">
                {/* Main content goes here */}
            </div>
        </div>
    );
};

export default SideBar;