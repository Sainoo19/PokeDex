import React, { useState, useEffect } from "react";
import UseFormValidation from "../validation/UseFormValidation";
import axios from "axios";

//đây là nguyên cái form nè

export default function AddPokemon({}) {
  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]); // Thêm state cho moves
  // const [imageUrl, setImageUrl] = useState(null);

  const [pokemon, setPokemon] = useState([]);

  // lưu tạm ảnh thêm vào để hiển thị
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/pokemon");
        setPokemon(response.data);
      } catch (error) {
        console.error("Error fetching abilities:", error);
      }
    };

    const fetchAbilities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/abilities/abilities"
        );
        setAbilities(response.data);
      } catch (error) {
        console.error("Error fetching abilities:", error);
      }
    };

    const fetchTypes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/type/types"
        );
        setTypes(response.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    const fetchMoves = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/moves/");
        setMoves(response.data);
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    };

    fetchAbilities();
    fetchTypes();
    fetchMoves();
    fetchAllPokemon();
  }, []);

  const handleCheckboxChange = (typeName) => {
    setCheckboxValue((prevValue) => {
      // Kiểm tra nếu checkbox đã được chọn
      if (prevValue.includes(typeName)) {
        // Nếu đã chọn, bỏ chọn nó
        return prevValue.filter((name) => name !== typeName);
      } else {
        // Nếu chưa chọn, thêm vào mảng
        return [...prevValue, typeName];
      }
    });
  };

  const handleCheckboxChange1 = (moveName) => {
    if (checkboxValue1.includes(moveName)) {
      // Nếu move đã được chọn thì bỏ chọn
      setCheckboxValue1(checkboxValue1.filter((name) => name !== moveName));
    } else {
      // Nếu move chưa được chọn thì thêm vào danh sách
      setCheckboxValue1([...checkboxValue1, moveName]);
    }
  };

  const handleAbilityChange = (e) => {
    const selectedAbility = abilities.find(
      (ability) => ability.name === e.target.value
    );
    setSelectValue(selectedAbility); // Lưu đối tượng đầy đủ vào state
  };

  const handlePokemonChange = (e) => {
    const selectedPokemon = pokemon.find(
      (ability) => ability.name === e.target.value
    );
    setSelectEvolution(selectedPokemon); // Lưu đối tượng đầy đủ vào state
  };

  // bắt lỗi height khi save
  const {
    height,
    setHeight,
    weight,
    setWeight,
    text,
    setText,
    selectValue,
    setSelectValue,
    checkboxValue,
    setCheckboxValue,
    checkboxValue1,
    setCheckboxValue1,
    number,
    number1,
    setNumber,
    setNumber1,
    number2,
    number3,
    number4,
    number5,
    setNumber2,
    setNumber3,
    setNumber4,
    setNumber5,
    errors,
    handleSave,
    handlePost,
    formRef,
    handleCancel,
    selectEvolution,
    setSelectEvolution,
    level,
    setLevel,
    description,
    setDescription,
  } = UseFormValidation({ moves });

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(URL.createObjectURL(uploadedFile)); // Hiển thị ảnh xem trước
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
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSave}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">
            Add Profile Pokemon
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
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
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.text ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.text
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.text}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Describes the pokemon's status."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.description ? "ring-red-600" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    errors.description
                      ? "focus:ring-red-600"
                      : "focus:ring-indigo-600"
                  } sm:text-sm`}
                />
              </div>
              {errors && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.description}
                </p>
              )}{" "}
              {/* Hiển thị lỗi */}
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-900"
              >
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
              <label
                htmlFor="city"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Height
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="height"
                  name="height"
                  type="number"
                  placeholder="m"
                  min="0" // Đảm bảo giá trị lớn hơn hoặc bằng 0
                  step="0.1" // Bước nhảy (thập phân 1 chữ số)
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.height ? "ring-red-600" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    errors.height
                      ? "focus:ring-red-600"
                      : "focus:ring-indigo-600"
                  } sm:text-sm`}
                />
              </div>
              {errors && (
                <p className="mt-2 text-sm text-red-600">{errors.height}</p>
              )}{" "}
              {/* Hiển thị lỗi */}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Weight
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="kg"
                  min="0" // Đảm bảo giá trị lớn hơn hoặc bằng 0
                  step="0.1" // Bước nhảy (thập phân 1 chữ số)
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.height ? "ring-red-600" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    errors.height
                      ? "focus:ring-red-600"
                      : "focus:ring-indigo-600"
                  } sm:text-sm`}
                />
              </div>
              {errors && (
                <p className="mt-2 text-sm text-red-600">{errors.weight}</p>
              )}{" "}
              {/* Hiển thị lỗi */}
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="country"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Abilities
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <select
                  id="abilities"
                  name="abilities"
                  // className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight "
                  value={selectValue?.name || ""}
                  onChange={handleAbilityChange}
                  className={`block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ${
                    errors.select ? "ring-red-600" : "ring-gray-300"
                  } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                    errors.select
                      ? "focus:ring-red-600"
                      : "focus:ring-indigo-600"
                  } sm:text-sm`}
                >
                  <option value="">Select Ability</option>
                  {abilities.map((ability) => (
                    <option key={ability._id} value={ability.name}>
                      {ability.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors && (
                <p className="mt-2 text-sm text-red-600">{errors.select}</p>
              )}{" "}
              {/* Hiển thị lỗi */}
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Type
                <span className="text-red-600 ml-1">*</span>
              </legend>
              <div className="mt-6 space-y-6 flex">
                <div className=" relative flex gap-x-3">
                  <div className="grid grid-cols-6 gap-2">
                    {types.map((type) => (
                      <label
                        key={type._id}
                        className="inline-flex items-center"
                      >
                        <input
                          type="checkbox"
                          value={type.name}
                          checked={checkboxValue.includes(type.name)} // Kiểm tra xem type có được chọn không
                          onChange={() => handleCheckboxChange(type.name)} // Gọi hàm khi checkbox thay đổi
                          className="h-5 w-5 bg-gray-300 border-2 border-gray-300 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <span className="ml-2 font-medium text-gray-900">
                          {type.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {errors.checkboxValue && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.checkboxValue}
                </p> // Hiển thị lỗi nếu có
              )}
            </fieldset>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2
            htmlFor="region"
            className="ml-2 mb-6 block text-sm font-semibold text-gray-900"
          >
            Stats
          </h2>

          <div className="pl-1 grid grid-cols-3 gap-8 ml-8">
            <div className="">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
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
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
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
                    value={number1}
                    onChange={(e) => setNumber1(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number1 ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number1
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number1}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="ml-8">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Defense
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    id="defense"
                    name="Defense"
                    type="number"
                    min="0"
                    value={number2}
                    onChange={(e) => setNumber2(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number2 ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number2
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number2}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
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
                    value={number3}
                    onChange={(e) => setNumber3(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number3 ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number3
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number3}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
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
                    value={number4}
                    onChange={(e) => setNumber4(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number4 ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number4
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number4}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>

            <div className="ml-8">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Speed
                <span className="text-red-600 ml-1">*</span>
              </label>
              <div className="mt-2">
                <div className="w-16 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    id="Speed"
                    name="Speed"
                    type="number"
                    min="0"
                    value={number5}
                    onChange={(e) => setNumber5(e.target.value)}
                    className={`block w-full rounded-md border-0 py-2 px-2 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                      errors.number5 ? "ring-red-600" : "ring-gray-300"
                    } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
                      errors.number5
                        ? "focus:ring-red-600"
                        : "focus:ring-indigo-600"
                    } sm:text-sm`}
                  />
                </div>
                {errors && (
                  <p className="mt-2 text-sm text-red-600">{errors.number5}</p>
                )}{" "}
                {/* Hiển thị lỗi */}
              </div>
            </div>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="country"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Evolution
          </label>
          <div className="mt-2">
            <select
              id="evolution"
              name="evolution"
              value={selectEvolution?.name || ""}
              onChange={handlePokemonChange}
              className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset"
              //  ${
              //   errors.select ? "ring-red-600" : "ring-gray-300"
              // } placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              //   errors.select ? "focus:ring-red-600" : "focus:ring-indigo-600"
              // } sm:text-sm`}
            >
              <option value="">Select Pokemon</option>
              {pokemon.map((pokemon) => (
                <option key={pokemon._id} value={pokemon.name}>
                  {pokemon.name}
                </option>
              ))}
            </select>
          </div>
          {/* {errors && <p className="mt-2 text-sm text-red-600">{errors.select}</p>} Hiển thị lỗi */}
        </div>

        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor="city"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Level
          </label>
          <div className="mt-2">
            <input
              id="level"
              name="level"
              type="number"
              placeholder=""
              min="0" // Đảm bảo giá trị lớn hơn hoặc bằng 0
              // step="0.1" // Bước nhảy (thập phân 1 chữ số)
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset "
            />
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm/6 font-semibold text-gray-900">
                Moves
                <span className="text-red-600 ml-1">*</span>
              </legend>
              <div className="mt-6 space-y-6">
                {/* Table */}
                <table className="min-w-full bg-white shadow rounded-lg overflow-hidden border border-gray-300 table-fixed">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="w-12 px-2 py-2">✔</th>
                      <th className="w-20 px-2 py-2">Name</th>
                      <th className="w-16 px-2 py-2">Type</th>
                      <th className="w-16 px-2 py-2">Power</th>
                      <th className="w-16 px-2 py-2">Acc.</th>
                      <th className="w-16 px-2 py-2">PP</th>
                      <th className="px-4 py-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {moves
                      .filter(
                        (move, index, self) =>
                          index === self.findIndex((m) => m.name === move.name)
                      ) // Loại bỏ dữ liệu trùng lặp theo `name`
                      .sort((a, b) => a.name.localeCompare(b.name)) // Sắp xếp theo A-Z dựa trên `name`
                      .map((move) => (
                        <tr
                          key={move._id}
                          className="hover:bg-gray-100 transition duration-200"
                        >
                          <td className="w-12 px-2 py-2 text-center">
                            <input
                              type="checkbox"
                              value={move.name}
                              checked={checkboxValue1.includes(move.name)} // Kiểm tra xem move có được chọn không
                              onChange={() => handleCheckboxChange1(move.name)} // Gọi hàm xử lý khi thay đổi
                              className="h-4 w-4 bg-gray-300 border-2 rounded text-indigo-600 focus:ring-indigo-600"
                            />
                          </td>
                          <td className="w-20 px-2 py-2 text-sm">
                            {move.name}
                          </td>
                          <td className="w-16 px-2 py-2 text-sm">
                            {move.type}
                          </td>
                          <td className="w-16 px-4 py-2 text-sm">
                            {move.power}
                          </td>
                          <td className="w-16 px-4 py-2 text-sm">
                            {move.accuracy}
                          </td>
                          <td className="w-16 px-4 py-2 text-sm">{move.pp}</td>
                          <td className="px-4 py-2 text-sm">
                            {move.description}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {errors.checkboxValue1 && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.checkboxValue1}
                  </p>
                )}
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          onClick={handleCancel}
          type="button"
          className="text-sm/6 font-semibold text-gray-900"
        >
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
  );
}
