// EvolutionInfo.js
import React from 'react';

const EvolutionInfo = () => {
    return (
        <div className="mb-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Pokémon Evolution Guide</h1>
            <div className='bg-gray-200 rounded-lg p-6 text-base shadow-md mb-6 hover:bg-gray-100 hover:shadow-xl transition duration-100' style={{ fontFamily: 'Playwrite GB S, sans-serif' }}>
                <p className='mb-4'>
                    Below is a list of Pokémon grouped into their evolutionary chains for easy browsing. The charts also specify the conditions by which they evolve. Note that for most conditional evolutions (such as Friendship), the Pokémon needs to level up once the condition is met in order to evolve. You can quickly search for a Pokémon name using the box below, or use the menu below right to view evolutions by certain conditions.
                </p>
                <p>
                    Pokémon with cross-generation evolutions are shown in the earliest generation its Pokémon appear. For example, Pichu is shown in Generation 1 because Pikachu/Raichu are Gen 1. Alolan Forms from Pokémon Sun & Moon are also listed in Generation 1, alongside their non-Alolan counterparts.
                </p>
            </div>
            <h2 className="text-3xl font-bold mt-6 mb-4 text-center">About Pokémon Evolution</h2>
            <div className='px-6'>
                <p className='mb-4'>
                    Evolution is a key part of the Pokémon games. Evolving Pokémon makes them stronger and often gives them a wider movepool. Several species of Pokémon are only obtainable through evolution.
                </p>
                <p className='mb-4'>
                    There are several methods of evolution, with more variations being added with each game. In Red/Blue/Yellow, a Pokémon might evolve by training it to a certain <em>level</em>, applying an <em>elemental stone</em>, or <em>trading</em> via cable link.
                </p>
                <p>
                    In Gold/Silver/Crystal, additional methods were added, namely <em>friendship level</em> and <em>trading</em> with a held item. Later games added even more methods based on things such as <em>gender</em>, <em>time of day</em>, or after a certain <em>move</em> is learned.
                </p>
            </div>
        </div>
    );
};

export default EvolutionInfo;
