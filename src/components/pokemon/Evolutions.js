import React, { useState, useEffect } from 'react';

const typeToStyle = {
    Normal: "bg-gray-200 text-gray-800",
    Grass: "bg-green-200 text-green-800",
    Electric: "bg-yellow-300 text-yellow-900",
    Flying: "bg-purple-200 text-purple-800",
    Fire: "bg-red-200 text-red-800",
    Water: "bg-blue-200 text-blue-800",
    Bug: "bg-lime-200 text-lime-800",
    Fairy: "bg-pink-100 text-pink-800",
    Fighting: "bg-orange-300 text-orange-900",
    Psychic: "bg-pink-300 text-pink-800",
    Rock: "bg-amber-400 text-amber-900",
    Ghost: "bg-indigo-200 text-indigo-800",
    Ice: "bg-cyan-200 text-cyan-800",
    Dragon: "bg-blue-300 text-blue-800",
    Dark: "bg-gray-600 text-gray-200",
    Steel: "bg-gray-300 text-gray-800",
    Poison: "bg-purple-500 text-purple-100",
    Ground: "bg-amber-700 text-yellow-200",
};



const Evolutions = ({ pokemon, evolutions }) => {
    if (!Array.isArray(evolutions)) {
        return <p>Không có chuỗi tiến hóa nào.</p>;
    }

    return (
        <div className="mt-4 evolutions flex flex-wrap justify-around items-center bg-gray-200 p-5 rounded-lg">
            {evolutions.length > 0 ? (
                evolutions.map((evolution, index) => (
                    evolution && evolution.name ? (
                        <div key={index} className="evolution-item text-center flex flex-col items-center">
                            <img
                                src={`/assets/images/${evolution.name}.png`}
                                alt={evolution.name}
                                className="w-24 h-24 rounded-full"
                            />
                            <p className="mt-2">{evolution.name} #{evolution.chain_id}</p>
                            <div className="flex flex-wrap justify-center gap-2 mt-2">
                                {evolution.type.map((type, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-5 py-1 rounded-lg ${typeToStyle[type] || "bg-gray-200 text-gray-800"}`}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p key={index}>Dữ liệu tiến hóa không hợp lệ</p>
                    )
                ))
            ) : (
                <p>Không có chuỗi tiến hóa nào.</p>
            )}
        </div>
    );
};

export default Evolutions;
