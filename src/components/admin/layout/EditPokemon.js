import React, { useState, useEffect } from "react";
import UseFormValidationForEdit from "../validation/UseFormValidationForEdit";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

//đây là nguyên cái form nè

export default function EditPokemon({pokemon }) {

  //abilities
  const [abilities, setAbilities] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState('');
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [moves, setMoves] = useState([]); // Thêm state cho moves
  const [selectedMoves, setSelectedMoves] = useState([]);

//Thư note B3 
  const [name, setName] = useState(pokemon?.name || '');
  const [pokemonData, setPokemonData] = useState(null);
  const [description, setDescription] = useState('');
  const [selectValue2, setSelectValue2] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true); 
  

    //get API
  useEffect(() => {
    if (pokemon) {
      setDescription(pokemon.description || '');
      setHeight(pokemon.height || '');
      setWeight(pokemon.weight || '');
      setSelectValue2(pokemonData?.abilities[0]?.name || '');
      setTypes(pokemon?.types || []);
      const fetchData = async () => {
        try {
          const responseAPokemon = await axios.get(`http://localhost:8080/api/pokemon/${pokemon.name}`);
          setPokemonData(responseAPokemon.data); // Lưu dữ liệu nhận được từ API vào state
        } catch (error) {
          console.error("Error fetching Pokemon data:", error);
        }
      };

      fetchData(); // Gọi fetchData để lấy dữ liệu
  }

    const fetchAbilities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/abilities/abilities');
            setAbilities(response.data);
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    };

    const fetchTypes = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/type/types');
          setTypes(response.data);
      } catch (error) {
          console.error('Error fetching types:', error);
      }
    };

    const fetchMoves = async () => {
      try {
          const response = await axios.get('http://localhost:8080/api/moves/');
          setMoves(response.data);
      } catch (error) {
          console.error('Error fetching moves:', error);
      }
    };

    fetchAbilities();
    fetchTypes();
    fetchMoves();

  }, []);


const handleCheckboxChange = (name) => {
  setCheckboxValue((prev) => {
    if (prev.includes(name)) {
      // Nếu đã chọn, bỏ chọn
      return prev.filter((item) => item !== name);
    } else {
      // Nếu chưa chọn, thêm vào
      return [...prev, name];
    }
  });
  if (pokemonData) {
    const updatedTypes = pokemonData?.type.includes(name)
      ? pokemonData.type.filter((type) => type !== name)
      : [...pokemonData.type, name];
    
    setPokemonData({
      ...pokemonData,
      type: updatedTypes,
    });
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setPokemonData((prevData) => ({
    ...prevData,
    base_stats: {
      ...prevData.base_stats,
      [name]: value, 
    },
    evolutions: [
      {
        ...prevData.evolutions[0],
        [name]: value,
      },
    ],
  }));
  if (name === "hp") {
    setNumber(value); // Cập nhật giá trị cho hp
  } else if (name === "defense") {
    setNumber2(value); // Cập nhật giá trị cho defense
  } else if (name === "attack") {
    setNumber1(value); // Cập nhật giá trị cho attack (ví dụ)
  }
  else if (name === "special_attack") {
    setNumber3(value); // Cập nhật giá trị cho attack (ví dụ)
  }
  else if (name === "special_defense") {
    setNumber4(value); // Cập nhật giá trị cho attack (ví dụ)
  }
  else if (name === "speed") {
    setNumber5(value); // Cập nhật giá trị cho attack (ví dụ)
  }
};

const onCheckboxChangeMove = (moveName) => {
  setPokemonData((prevData) => {
    const newMoves = prevData.moves ? [...prevData.moves] : []; // Tạo bản sao mảng moves

    if (newMoves.some((move) => move.name === moveName)) {
      // Nếu move đã có trong mảng, thì bỏ chọn (loại bỏ)
      const updatedMoves = newMoves.filter((move) => move.name !== moveName);
      return {
        ...prevData,
        moves: updatedMoves,
      };
    } else {
      // Nếu move chưa có trong mảng, thì thêm vào
      const updatedMoves = [...newMoves, { name: moveName }];
      return {
        ...prevData,
        moves: updatedMoves,
      };
    }
  });
};





  // bắt lỗi height khi save
  const { height, setHeight, weight, setWeight, text, setText, selectValue, setSelectValue, checkboxValue, setCheckboxValue, checkboxValue1, setCheckboxValue1, number, number1, setNumber, setNumber1,number2, number3, number4, number5, setNumber2, setNumber3, setNumber4, setNumber5, errors, handleSave, formRef, handleCancel } = UseFormValidationForEdit();

    // lưu tạm ảnh thêm vào để hiển thị
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
        setFile(URL.createObjectURL(uploadedFile)); // Lưu URL của ảnh để hiển thị
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
        setFile(URL.createObjectURL(droppedFile));
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleRemoveImage = () => {
      if (file) {
        URL.revokeObjectURL(file); // Xóa URL tạm
        setFile(null); // Reset state
    }      };
    const handleAbilitiesChange = (e) => {
      const selectedAbility = e.target.value;
      setSelectValue2(selectedAbility);
    
      setPokemonData((prevData) => ({
        ...prevData,
        abilities: [{ name: selectedAbility, effect: 'Effect of the ability' }] // Cập nhật mảng abilities
      }));
    };
    //HandleDataEvolutionJson
    //npm install uuid -> tạo ID ngẫu nhiên trong môi trường client-side, chạy trước khi demo
    const addDefaultValuesForEvolutions = (evolutions) => {
      return evolutions.map((evolution) => {
        if (!evolution._id) {
          evolution._id = uuidv4();
        }
        if (!evolution.to) {
          evolution.to = "Unknown";
        }
        if (!evolution.method) {
          evolution.method = "Unknown";
        }    
        return evolution;
      });
    };
    
    //HandleDataMoveJson
    const addDefaultValuesForMoves = (moves) => {
      return moves.map((move) => {
        // Kiểm tra nếu thiếu thông tin (type, power, accuracy, pp, description, vv.)
        if (!move.type) {
          move.type = "Unknown"; // Cung cấp giá trị mặc định nếu thiếu
        }
        if (move.power === undefined) {
          move.power = 0; // Cung cấp giá trị mặc định cho power nếu thiếu
        }
        if (move.accuracy === undefined) {
          move.accuracy = 100; // Cung cấp giá trị mặc định cho accuracy nếu thiếu
        }
        if (move.pp === undefined) {
          move.pp = 0; // Cung cấp giá trị mặc định cho pp nếu thiếu
        }
        if (!move.description) {
          move.description = "No description available"; // Cung cấp mô tả mặc định nếu thiếu
        }
        return move;
      });
    };
    
    // HandleEditButton
    const [errorss, setErrorss] = useState({});
    const validateForm = () => {
      const newErrorss = {};
      if (!pokemonData.name) newErrorss.name = 'Name is required';
      //if (!pokemonData.hp || pokemonData.hp <= 0) newErrorss.hp = 'HP must be a positive number';
      setErrorss(newErrorss);
      return Object.keys(newErrorss).length === 0;
    };
    const handleEdit = async () => {
      if (!validateForm()) {
        alert('Please fix the form errors before saving.');
        return;
      }
      pokemonData.moves = addDefaultValuesForMoves(pokemonData.moves);
      pokemonData.evolutions = addDefaultValuesForEvolutions(pokemonData.evolutions);
      console.log('Dữ liệu sau khi bổ sung giá trị mặc định cho evolutions:', pokemonData);
      try {
        const response = await fetch(`http://localhost:8080/api/pokemon/${pokemon._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pokemonData), 
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const updatedPokemon = await response.json();
        console.log('Successfully updated Pokemon:', updatedPokemon);
        alert('Pokemon data updated successfully!');
      } catch (error) {
        console.error('Error updating Pokémon data:', error);
        alert('Failed to update Pokémon data. Please try again.');
      }
    };
    return (
      <div>
        <form ref={formRef} onSubmit={handleSave}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">Add Profile Pokemon</h2>
              
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* NameFieldComponent */}
                <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                    Name<span className="text-red-600 ml-1">*</span>
                  </label>
                  <div className="mt-2 sm:max-w-md">
                    <div className="flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name Pokemon"
                        autoComplete="name"
                        value={pokemonData?.name || ''}
                        onChange={(e) =>
                          setPokemonData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* DescriptionFieldComponent */}
                <div className="col-span-full">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={pokemonData?.description || ''}
                      onChange={(e) =>
                        setPokemonData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                  <p className="mt-3 text-sm text-gray-600">Describes the Pokémon's status.</p>
                </div>

                {/* PhotoFieldComponent */}
                <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                        Photo
                    </label>
                    <div
                        className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                        onDrop={handleDrop} // Xử lý khi người dùng thả tệp
                        onDragOver={handleDragOver} // Cho phép kéo vào khu vực
                    >
                        <div className="text-center">
                        {file ? (
                            <>
                                <div className="flex justify-center items-center w-32 h-32 bg-gray-100 border border-gray-300 rounded-lg">
                                    <img
                                        src={file}
                                        alt="Uploaded File"
                                        className="max-w-full max-h-full object-contain"
                                    />
                                </div>
                                <button
                                    onClick={handleRemoveImage}
                                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition duration-300 mt-4"
                                    >
                                    Remove Image
                                    </button>
                                </>

                                
                            ) : (
                            <>
                            <div className="mt-4 flex text-sm text-gray-600">
                                <label
                                htmlFor="photo-pokemon"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                <span>Upload a file</span>
                                <input
                                    id="photo-pokemon"
                                    name="photo-pokemon"
                                    type="file"
                                    className="sr-only"
                                    onChange={handleFileUpload} // Xử lý khi người dùng chọn tệp
                                />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-600">PNG up to 10MB</p>
                            </>
                        )}
                        </div>
                    </div>
                </div>
                
                {/* HeightFieldComponent */}
                <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="height" className="block text-sm font-medium text-gray-900">
                    Height<span className="text-red-600 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="height"
                      name="height"
                      type="number"
                      min="0"
                      step="0.1"
                      value={pokemonData?.height || ''}
                      onChange={(e) =>
                        setPokemonData((prev) => ({
                          ...prev,
                          height: parseFloat(e.target.value),
                        }))
                      }
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                
                {/* WeightFieldComponent */}
                <div className="sm:col-span-2">
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-900">
                    Weight<span className="text-red-600 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      min="0"
                      step="0.1"
                      value={pokemonData?.weight || ''}
                      onChange={(e) =>
                        setPokemonData((prev) => ({
                          ...prev,
                          weight: parseFloat(e.target.value),
                        }))
                      }
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>

                {/* AbilitiesFieldComponent */}
                <div className="sm:col-span-2">
                  <label htmlFor="abilities" className="block text-sm font-medium text-gray-900">
                    Abilities<span className="text-red-600 ml-1">*</span>
                  </label>
                  <div className="mt-2">
                    <select
                      id="abilities"
                      name="abilities"
                      value={selectValue2}
                      onChange={handleAbilitiesChange}
                      className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                    >
                      <option value="">Select Ability</option>
                      {pokemonData?.abilities?.map((ability) => (
                        <option key={ability._id} value={ability.name}>
                          {ability.name}
                        </option>
                      ))}
                      {abilities.map((ability) => (
                        <option key={ability._id} value={ability.name}>
                          {ability.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* TypeFieldComponent */}
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900">
                    Type<span className="text-red-600 ml-1">*</span>
                  </legend>
                  <div className="mt-6 flex">
                    <div className="grid grid-cols-6 gap-2">
                      {types.map((type) => (
                        <label key={type._id} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={type.name}
                            checked={pokemonData?.type.includes(type.name)}
                            onChange={() => handleCheckboxChange(type.name)}
                            className="h-5 w-5 bg-gray-300 border-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <span className="ml-2 font-medium text-gray-900">{type.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>

            {/* StatsFieldComponent */}
            <div className="border-b border-gray-900/10 pb-12">
                  <h2 htmlFor="region" className="ml-2 mb-6 block text-sm font-semibold text-gray-900">
                  Stats
                  </h2>
                  <div className="pl-1 grid grid-cols-3 gap-8 ml-8"> 

                    {/* HPFieldComponent */}
                    <div>
                      <label htmlFor="hp" className="block text-sm font-medium text-gray-900">
                        HP<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-16 flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                          <input
                            id="hp"
                            name="hp"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.hp || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                hp: e.target.value,
                              },
                            }))}


                            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* AttackFieldComponent */}
                    <div>
                      <label htmlFor="attack" className="block text-sm font-medium text-gray-900">
                        Attack<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-16 flex rounded-md shadow-sm ring-1 ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                          <input
                            id="attack"
                            name="attack"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.attack || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                attack: e.target.value,
                              },
                            }))}
                            className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* DefenseFieldComponent */}
                    <div className="ml-8">
                      <label htmlFor="defense" className="block text-sm font-medium text-gray-900">
                        Defense<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-16 flex rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                          <input
                            id="defense"
                            name="defense"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.defense || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                defense: e.target.value,
                              },
                            }))}
                            className="block w-full rounded-md py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special-AttackFieldComponent */}
                    <div>
                      <label htmlFor="special_attack" className="block text-sm font-medium text-gray-900">
                        Special Attack<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-18 flex rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                          <input
                            id="special_attack"
                            name="special_attack"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.special_attack || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                special_attack: e.target.value,
                              },
                            }))}
                            className="block w-full rounded-md py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Special-DefenseFieldComponent */}
                    <div>
                      <label htmlFor="special_defense" className="block text-sm font-medium text-gray-900">
                        Special Defense<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-18 flex rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                          <input
                            id="special_defense"
                            name="special_defense"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.special_defense || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                special_defense: e.target.value,
                              },
                            }))}
                            className="block w-full rounded-md py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SpeedFieldComponent */}
                    <div className="ml-8">
                      <label htmlFor="speed" className="block text-sm font-medium text-gray-900">
                        Speed<span className="text-red-600 ml-1">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="w-16 flex rounded-md shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600">
                          <input
                            id="speed"
                            name="speed"
                            type="number"
                            min="0"
                            value={pokemonData?.base_stats?.speed || ''}
                            onChange={(e) => setPokemonData((prevData) => ({
                              ...prevData,
                              base_stats: {
                                ...prevData.base_stats,
                                speed: e.target.value,
                              },
                            }))}
                            className="block w-full rounded-md py-2 px-2 text-gray-900 placeholder:text-gray-400 focus:ring-2 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

            {/* Name-evolutionFieldComponent */}
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="to" className="block text-sm font-medium text-gray-900">
                  Name evolution
                </label>
                <div className="mt-2">
                  <input
                    id="to"
                    name="to"
                    type="text"
                    autoComplete="given-name"
                    value={pokemonData?.evolutions?.[0]?.to || ''}
                    onChange={(e) => {
                      setPokemonData(prevData => {
                        const updatedEvolutions = prevData.evolutions ? [...prevData.evolutions] : [];
                        updatedEvolutions[0] = {
                          ...updatedEvolutions[0],
                          to: e.target.value,
                        };
            
                        return {
                          ...prevData,
                          evolutions: updatedEvolutions,  // Cập nhật mảng evolutions
                        };
                      });
                    }}
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm p-1"
                  />
                </div>
              </div>
            </div>

            {/* MovesFieldComponent */}
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold text-gray-900">
                    Moves <span className="text-red-600 ml-1">*</span>
                  </legend>
                  <div className="mt-6 flex gap-3">
                    <div className="grid grid-cols-4 gap-2">
                      {moves.map((move) => (
                        <label key={move._id} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={move.name}
                            checked={pokemonData?.moves?.some((m) => m.name === move.name)}
                            onChange={() => onCheckboxChangeMove(move.name)}
                            className="h-5 w-5 bg-gray-300 border-2 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600"
                          />
                          <span className="ml-2 font-medium text-gray-900">{move.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
    
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={handleCancel}
              type="button"
              className="text-sm font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              onClick={handleEdit}
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>

        </form>
      </div>        
    );
  };

