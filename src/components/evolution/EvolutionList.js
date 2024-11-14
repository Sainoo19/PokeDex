import React, { useState, useEffect } from 'react';


const EvolutionList = ({ filteredPokemons, typeToStyle }) => {
    return(
        <div>
            <h1 className="text-3xl font-bold mb-4 text-left">Generation 1</h1>
            <ul className='flex flex-col items-center'>
                {filteredPokemons.map((pokemon, index) => (
                        <div key={pokemon._id} className="w-full flex flex-col items-center">
                            <li className="flex my-8">
                                {/* cấp 1 */}
                            {pokemon.evolution_chain[0] && (
                                <div className="flex flex-col items-center">
                                    <img 
                                        src={`/assets/images/${pokemon.evolution_chain[0].name}.png`} 
                                        alt={pokemon.evolution_chain[0].name} 
                                        className=" w-32 h-32 mb-4" 
                                    />
                                    <a 
                                        href={`/pokemon/${pokemon.evolution_chain[0].name}`} 
                                        // style={{ color: '#2769be', fontWeight: 'bold' }}
                                        className="hover:text-wine-red hover:underline font-bold text-[#2769be]"
                                        onMouseEnter={(e) => e.target.style.color = '#8B0000'} // Đổi màu khi hover
                                        onMouseLeave={(e) => e.target.style.color = '#2769be'}  // Trở lại màu ban đầu khi rời chuột
                                    >
                                        {pokemon.evolution_chain[0].name}
                                    </a>
                                    
                                    {pokemon.evolution_chain[0].type && (
                                        <div className="flex space-x-2">
                                            {pokemon.evolution_chain[0].type.map((type, idx) => (
                                                <span key={idx} className={`font-medium  rounded ${typeToStyle[type]}`}>
                                                    {type}
                                                    {idx < pokemon.evolution_chain[0].type.length - 1 &&  <span className="text-gray-500"> • </span>}
                                                </span>
                                            ))}
                                        </div>
                                    )}


                                </div>
                            )}

                            {/* Cấp 2 */}
                            {pokemon.evolution_chain[1] && (
                                <div className="flex  items-center ">
                                    <span className="text-2xl mx-8 ml-24">→</span>

                                    <div className="flex flex-col items-center mx-24">
                                        <img 
                                            src={`/assets/images/${pokemon.evolution_chain[1].name}.png`} 
                                            alt={pokemon.evolution_chain[1].name} 
                                            className=" w-32 h-32 mb-4" 
                                        />
                                        <a 
                                            href={`/pokemon/${pokemon.evolution_chain[1].name}`} 
                                            // style={{ color: '#2769be', fontWeight: 'bold' }}
                                            className="hover:text-wine-red hover:underline font-bold text-[#2769be]"
                                            onMouseEnter={(e) => e.target.style.color = '#8B0000'} // Đổi màu khi hover
                                            onMouseLeave={(e) => e.target.style.color = '#2769be'}  // Trở lại màu ban đầu khi rời chuột
                                        >
                                            {pokemon.evolution_chain[1].name}
                                        </a>

                                        {pokemon.evolution_chain[0].type && (
                                            <div className="flex space-x-2">
                                                {pokemon.evolution_chain[0].type.map((type, idx) => (
                                                    <span key={idx} className={`font-medium  rounded ${typeToStyle[type]}`}>
                                                        {type}
                                                        {idx < pokemon.evolution_chain[0].type.length - 1 &&  <span className="text-gray-500"> • </span>}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            

                            {/* Cấp 3 */}
                            {pokemon.evolution_chain[2] && (
                                <div className="flex items-center">
                                    <span className="text-2xl mx-8 mr-24">→</span>

                                    <div className="flex flex-col items-center ">
                                        <img 
                                            src={`/assets/images/${pokemon.evolution_chain[2].name}.png`} 
                                            alt={pokemon.evolution_chain[2].name} 
                                            className=" w-32 h-32 mb-4" 
                                        />
                                        <a 
                                            href={`/pokemon/${pokemon.evolution_chain[2].name}`} 
                                            // style={{ color: '#2769be', fontWeight: 'bold' }}
                                            className="hover:text-wine-red hover:underline font-bold text-[#2769be]"
                                            onMouseEnter={(e) => e.target.style.color = '#8B0000'} // Đổi màu khi hover
                                            onMouseLeave={(e) => e.target.style.color = '#2769be'}  // Trở lại màu ban đầu khi rời chuột
                                        >
                                            {pokemon.evolution_chain[2].name}
                                        </a>

                                        {pokemon.evolution_chain[0].type && (
                                            <div className="flex space-x-2">
                                                {pokemon.evolution_chain[0].type.map((type, idx) => (
                                                    <span key={idx} className={`font-medium  rounded ${typeToStyle[type]}`}>
                                                        {type}
                                                        {idx < pokemon.evolution_chain[0].type.length - 1 &&  <span className="text-gray-500"> • </span>}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {/* </li> */}

                            </li>
                            {/* Thêm đường gạch ngang */}
                            {index < filteredPokemons.length - 1 && (
                                <hr className="border-gray-300 w-[1200px] mx-auto my-2" />
                            )}
                        </div>
                    

                ))}
            </ul>
        </div>

    );
};

export default EvolutionList;