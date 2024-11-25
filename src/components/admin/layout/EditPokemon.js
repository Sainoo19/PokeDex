import React, { useState, useEffect } from "react";
import UseFormValidation from "../validation/UseFormValidationForEdit";
import axios from 'axios';

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
  
    //get API
  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
      setDescription(pokemon.description || '');
      setHeight(pokemon.height || '');
      setWeight(pokemon.weight || '');
      setSelectValue(pokemon?.abilities?.[0]?.name || '');
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
        ...prevData.evolutions[0], // Giữ các giá trị khác không thay đổi
        [name]: value, // Cập nhật trường 'to'
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
  // Cập nhật pokemonData.moves
  setPokemonData((prevData) => {
    const isSelected = prevData.moves?.some((move) => move.name === moveName); // Kiểm tra xem move có trong danh sách không
    const updatedMoves = isSelected
      ? prevData.moves.filter((move) => move.name !== moveName) // Nếu đã chọn, loại bỏ
      : [...(prevData.moves || []), { name: moveName }]; // Nếu chưa chọn, thêm vào

    return {
      ...prevData,
      moves: updatedMoves,
    };
  });

  // Cập nhật checkboxValue để kiểm soát checkbox
  setCheckboxValue((prevValues) => {
    return prevValues.includes(moveName)
      ? prevValues.filter((name) => name !== moveName) // Nếu đã chọn, loại bỏ
      : [...prevValues, moveName]; // Nếu chưa chọn, thêm vào
  });
};


  // bắt lỗi height khi save
  const { height, setHeight, weight, setWeight, text, setText, selectValue, setSelectValue, checkboxValue, setCheckboxValue,  checkboxValue1, setCheckboxValue1, number, number1, setNumber, setNumber1,number2, number3, number4, number5, setNumber2, setNumber3, setNumber4, setNumber5, errors, handleSave, formRef, handleCancel } = UseFormValidation();

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

    return (
      // <div>
      //   {isModalOpen && (
          <form ref={formRef} onSubmit={handleSave}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base/7 font-semibold text-gray-900">Add Profile Pokemon</h2>
                
      
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                      Name
                      <span className="text-red-600 ml-1">*</span> 
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="name pokemon"
                          autoComplete="name"
                          //Thư note B3
                          value={name}
                          onChange={(e) => setName(e.target.value)} 
                          //
                          className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.name ? "ring-red-600" : "ring-gray-300"
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                          errors.name ? "focus:ring-red-600" : "focus:ring-indigo-600"
                        } sm:text-sm`}     
                      
                        />
                      </div>
                      {errors?.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>} {/* Hiển thị lỗi */}

                    </div>
                  </div>
      
                  <div className="col-span-full">
                    <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
                    Description
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          //thư note B3
                        //value={pokemonData?.description || ''}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                      />
                    </div>
                    <p className="mt-3 text-sm/6 text-gray-600">Describes the pokemon's status.</p>
                  </div>
    

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

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                      Height
                      <span className="text-red-600 ml-1">*</span> 
                    </label>
                    <div className="mt-2">
                      <input
                        id="height"
                        name="height"
                        type="number"
                        min="0" // Đảm bảo giá trị lớn hơn hoặc bằng 0
                        step="0.1" // Bước nhảy (thập phân 1 chữ số)
                          //Thư note B3
                        //value={pokemonData?.height || ''}
                          value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors?.height ? "ring-red-600" : "ring-gray-300"
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                          errors?.height ? "focus:ring-red-600" : "focus:ring-indigo-600"
                        } sm:text-sm`}                    />
                    </div>
                    {errors?.height && <p className="mt-2 text-sm text-red-600">{errors.height}</p>} {/* Hiển thị lỗi */}
                  </div>
                  
      
                  <div className="sm:col-span-2">
                    <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                      Weight
                      <span className="text-red-600 ml-1">*</span> 
                    </label>
                    <div className="mt-2">
                      <input
                        id="weight"
                        name="weight"
                        type="number"
                        min="0" // Đảm bảo giá trị lớn hơn hoặc bằng 0
                        step="0.1" // Bước nhảy (thập phân 1 chữ số)
                          
                          //Thư note B3
                        //value={pokemonData?.weight || ''}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.weight ? "ring-red-600" : "ring-gray-300"
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                          errors.weight ? "focus:ring-red-600" : "focus:ring-indigo-600"
                        } sm:text-sm`}     
                      />
                    </div>
                    {errors && <p className="mt-2 text-sm text-red-600">{errors.weight}</p>} {/* Hiển thị lỗi */}

                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                    Abilities
                    <span className="text-red-600 ml-1">*</span> 

                    </label>
                    <div className="mt-2">
                      <select
                          id="abilities"
                          name="abilities"
                          
                          //Thư note B3
                          //value={pokemonData?.abilities?.[0]?.name || ''}
                          value={selectValue}
                          onChange={(e) => setSelectValue(e.target.value)}
                          className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                            errors.select ? "ring-red-600" : "ring-gray-300"
                          } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                            errors.select ? "focus:ring-red-600" : "focus:ring-indigo-600"
                          } sm:text-sm`}  
                      >
                        {/* Thư note B3 */}
                        {/* Lấy abilities name trong api */}
                          <option value="">Select Ability</option>
                          {pokemonData?.abilities?.map((ability) => (
                              <option key={ability._id} value={ability.name}>{ability.name}</option>
                          ))}
    
                          {abilities.map((ability) => (
                              <option key={ability._id} value={ability.name}>{ability.name}</option>
                          ))}
                      </select>
                    </div>
                    {errors && <p className="mt-2 text-sm text-red-600">{errors.select}</p>} {/* Hiển thị lỗi */}

                  </div>

                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                  <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">Type
                  <span className="text-red-600 ml-1">*</span> 
                  </legend>
                  <div className="mt-6 space-y-6 flex">

                    <div className=" relative flex gap-x-3">
                      <div className="grid grid-cols-6 gap-2">
                        {types.map((type) => (
                          <label key={type._id} className="inline-flex items-center">
                            <input
                              type="checkbox"
                              value={type.name}
                              
                              //Thư note B3
                              checked={pokemonData?.type.includes(type.name)}
                              
                              onChange={() => handleCheckboxChange(type.name)} // Gọi hàm khi checkbox thay đổi
                              className="h-5 w-5 bg-gray-300 border-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <span className="ml-2 font-medium text-gray-900">{type.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.checkboxValue && (
                    <p className="mt-2 text-sm text-red-600">{errors.checkboxValue}</p> // Hiển thị lỗi nếu có
                  )}

                </fieldset>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                    <h2 htmlFor="region" className="ml-2 mb-6 block text-sm font-semibold text-gray-900">
                    Stats
                    </h2>

                    <div className="pl-1 grid grid-cols-3 gap-8 ml-8"> 
                      <div className="">
                      <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                      HP
                        <span className="text-red-600 ml-1">*</span> 
                      </label>
                      <div className="mt-2">
                        <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                          <input
                            id="hp"
                            name="hp"
                            type="number"
                            min="0"
                            
                            //Thư note B3
                            value={pokemonData?.base_stats?.hp || ''}
                            
                            //onChange={(e) => setNumber(e.target.value)}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number}</p>} {/* Hiển thị lỗi */}

                      </div>
                    </div>

                      <div className="">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                          Attack
                          <span className="text-red-600 ml-1">*</span> 
                        </label>
                        <div className="mt-2">
                          <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              id="attack"
                              name="attack"
                              type="number"
                              min="0"
                              
                              //Thư note B3
                              value={pokemonData?.base_stats?.attack || ''}

                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number1 ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number1 ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number1}</p>} {/* Hiển thị lỗi */}
                        </div>
                      </div>

                      <div className="ml-8">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                          Defense
                          <span className="text-red-600 ml-1">*</span> 
                        </label>
                        <div className="mt-2">
                          <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              id="defense"
                              name="defense"
                              type="number"
                              min="0"

                              //Thư note B3
                              value={pokemonData?.base_stats?.defense || ''}

                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number2 ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number2 ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number2}</p>} {/* Hiển thị lỗi */}
                        </div>
                      </div>

                      <div className="">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                        Special Attack
                          <span className="text-red-600 ml-1">*</span> 
                        </label>
                        <div className="mt-2">
                          <div className="w-18 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              id="special_attack"
                              name="special_attack"
                              type="number"
                              min="0"

                              //Thư note B3
                              value={pokemonData?.base_stats?.special_attack || ''}

                              onChange={handleInputChange}
                              className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number3 ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number3 ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number3}</p>} {/* Hiển thị lỗi */}
                        </div>
                      </div>

                      <div className="">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                        Special Defense
                          <span className="text-red-600 ml-1">*</span> 
                        </label>
                        <div className="mt-2">
                          <div className="w-18 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              id="special_defense"
                              name="special_defense"
                              type="number"
                              min="0"

                              //Thư note B3
                              value={pokemonData?.base_stats?.special_defense || ''}

                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number4 ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number4 ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number4}</p>} {/* Hiển thị lỗi */}
                        </div>
                      </div>

                      <div className="ml-8">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                        Speed
                          <span className="text-red-600 ml-1">*</span> 
                        </label>
                        <div className="mt-2">
                          <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <input
                              id="Speed"
                              name="speed"
                              type="number"
                              min="0"

                              ////Thư note B3
                              value={pokemonData?.base_stats?.speed || ''}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                              errors.number5 ? "ring-red-600" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                              errors.number5 ? "focus:ring-red-600" : "focus:ring-indigo-600"
                            } sm:text-sm`}   
                          />
                        </div>
                        {errors && <p className="mt-2 text-sm text-red-600">{errors.number5}</p>} {/* Hiển thị lỗi */}
                        </div>
                      </div>

                    </div>
                    </div>

      
              <div className="">      
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                      Name evolution
                    </label>
                    <div className="mt-2">
                      <input
                        id="to"
                        name="to"
                        type="text"
                        autoComplete="given-name"
                        onChange={handleInputChange}
                        //Thư note B3
                        value={pokemonData?.evolutions?.[0]?.to || ''}

                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 p-1"
                      />
                    </div>
                  </div>
                </div>
              </div>



              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                  <fieldset>
                  <legend className="text-sm/6 font-semibold text-gray-900">Moves
                  <span className="text-red-600 ml-1">*</span> 
                  </legend>
                  <div className="mt-6 space-y-6 flex">

                    <div className=" relative flex gap-x-3">
                      <div className="grid grid-cols-4 gap-2">
                        {moves.map((move) => (
                          <label key={move._id} className="inline-flex items-center">
                            <input
                              type="checkbox"

                              //Thư note B3
                              value={move.name}
                              checked={pokemonData?.moves?.map(m => m.name).includes(move.name)} // Kiểm tra xem type có được chọn không
                              onChange={() => onCheckboxChangeMove(move.name)} // Gọi hàm khi checkbox thay đổi
                              
                              className="h-5 w-5 bg-gray-300 border-2 border-gray-300 rounded text-indigo-600 focus:ring-indigo-600"
                            />
                            <span className="ml-2 font-medium text-gray-900">{move.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  {errors.checkboxValue1 && (
                    <p className="mt-2 text-sm text-red-600">{errors.checkboxValue1}</p> // Hiển thị lỗi nếu có
                  )}
                </fieldset>
                </div>
              </div>

      
            </div>
      
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
              onClick={handleCancel}
              type="button" className="text-sm/6 font-semibold text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
      //   )}
      // </div>
      );
    };

