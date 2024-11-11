import React, { useState, useEffect } from 'react';


const Evolutions = () => (
    <div className="mt-4 evolutions flex justify-around items-center bg-gray-200 p-5 rounded-lg">
        <div className="evolution-item text-center">
            <img
                src="https://storage.googleapis.com/a1aa/image/mu37XO95ipI7BNpqkW76LXpqIi1vAbhT7VE4fQWF688e5eGnA.jpg"
                alt="Image of Bulbasaur"
                className="w-24 h-24 rounded-full"
            />
            <p>Bulbasaur #0001</p>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Grass</span>
            <span className="bg-purple-500 text-white px-2 py-1 rounded ml-2">Poison</span>
        </div>
        <i className="fas fa-arrow-right text-2xl"></i>
        <div className="evolution-item text-center">
            <img
                src="https://storage.googleapis.com/a1aa/image/IAuBs2GFrFaCJ9DIv0c3swWwKB0IjM6CMhaQp2hxikAfcvxJA.jpg"
                alt="Image of Ivysaur"
                className="w-24 h-24 rounded-full"
            />
            <p>Ivysaur #0002</p>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Grass</span>
            <span className="bg-purple-500 text-white px-2 py-1 rounded ml-2">Poison</span>
        </div>
        <i className="fas fa-arrow-right text-2xl"></i>
        <div className="evolution-item text-center">
            <img
                src="https://placehold.co/100x100"
                alt="Image of Venusaur"
                className="w-24 h-24 rounded-full"
            />
            //Vy fix commit abc
            <p>Venusaur #0003</p>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Grass</span>
            <span className="bg-purple-500 text-white px-2 py-1 rounded ml-2">Poison</span>
        </div>
    </div>
);

export default Evolutions;