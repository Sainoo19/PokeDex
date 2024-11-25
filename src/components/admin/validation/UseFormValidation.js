import { useState, useRef } from "react";
import axios from "axios";
import fetchMovesData from "../layout/AddPokemon";
// Để bắt lỗi trong cái form nha!!!!



// Hàm kiểm tra lỗi cho Height
const validateHeight = (height) => {
  if (!height || parseFloat(height) <= 0) {
    return "Height is required and must be greater than 0.";
  }
  return ""; // Không có lỗi
};
const validateWeight = (weight) => {
  if (!weight || parseFloat(weight) <= 0) {
    return "Weight is required and must be greater than 0.";
  }
  return ""; // Không có lỗi
};

const validateText = async (text) => {
  const specialCharRegex = /[^a-zA-Z0-9\s]/; // Regex phát hiện ký tự đặc biệt
  if (!text || text.trim() === "") {
    return "Name must not be empty."; // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
  }
  if (specialCharRegex.test(text)) {
    return "Name must not contain special characters."; // Kiểm tra ký tự đặc biệt
  }

  const nameExists = await checkNameExists(text);
  if (nameExists) {
    return "Name already exists.";
  }
  return ""; // Không có lỗi
};

const validateDescription = async (text) => {
  const specialCharRegex = /[^a-zA-Z0-9\s]/; // Regex phát hiện ký tự đặc biệt
  if (!text || text.trim() === "") {
    return "Description must not be empty."; // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
  }
  if (specialCharRegex.test(text)) {
    return "Description must not contain special characters."; // Kiểm tra ký tự đặc biệt
  }

  return ""; // Không có lỗi
};

const validateSelect = (value) => {
  if (!value || value === "") {
    return "Selection is required and must not be empty.";
  }
  return ""; // Không có lỗi
};

const validateCheckbox = (checkedValues) => {
  if (checkedValues.length < 1) {
    return "At least one checkbox must be selected.";
  }
  return ""; // Không có lỗi
};


const validateNumber = (number) => {
  if (number === "" || number === null || number === undefined) {
    return `Number is required.`; // Kiểm tra xem trường có bị bỏ trống không
  }
  if (parseFloat(number) <= 0) {
    return `Number cannot be less than 0.`; // Kiểm tra giá trị nhỏ hơn 0
  }
  return ""; // Không có lỗi
};



  // Kiểm tra tên đã tồn tại trong cơ sở dữ liệu
  const checkNameExists = async (name) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/pokemon/check-name?name=${name}`);  
      return response.data.exists;  
    } catch (error) {
      console.error("Error checking name:", error);
      return false;
    }
  };


const useFormValidation = ({ moves }) => {
  const [height, setHeight] = useState("");  // State lưu giá trị 
  const [weight, setWeight] = useState("");  // State lưu giá trị 
  const [text, setText] = useState("");  // State lưu giá trị 
  const [selectValue, setSelectValue] = useState("");
  const [number, setNumber] = useState("");  // State lưu giá trị 
  const [number1, setNumber1] = useState(""); 
  const [number2, setNumber2] = useState(""); 
  const [number3, setNumber3] = useState(""); 
  const [number4, setNumber4] = useState(""); 
  const [number5, setNumber5] = useState(""); 
  const [checkboxValue, setCheckboxValue] = useState("");
  const [checkboxValue1, setCheckboxValue1] = useState("");
  const [selectEvolution, setSelectEvolution] = useState("");
  const [level, setLevel] = useState("");  // State lưu giá trị 
  const [description, setDescription] = useState("");  // State lưu giá trị 




  const [errors, setErrors] = useState({});    // State lưu thông báo lỗi
  const formRef = useRef(null);

  // Hàm kiểm tra lỗi cho tất cả các trường
  const validateAllFields = async () => {
    const errors = {};

    // Kiểm tra các trường
    const weightError = validateWeight(weight);
    if (weightError) errors.weight = weightError;

    const heightError = validateHeight(height);
    if (heightError) errors.height = heightError;

    const selectError = validateSelect(selectValue);
    if (selectError) errors.select = selectError;

    const numberError = validateNumber(number);
    if (numberError) errors.number = numberError;

    // // Kiểm tra các trường số học khác
    // const numberError1 = validateNumber(number1);
    // if (numberError1) errors.number1 = numberError1;

    // const numberError2 = validateNumber(number2);
    // if (numberError2) errors.number2 = numberError2;

    // const numberError3 = validateNumber(number3);
    // if (numberError3) errors.number3 = numberError3;

    // const numberError4 = validateNumber(number4);
    // if (numberError4) errors.number4 = numberError4;

    // const numberError5 = validateNumber(number5);
    // if (numberError5) errors.number5 = numberError5;


    const validateNumbers = [number, number1, number2, number3, number4, number5];
    validateNumbers.forEach((num, index) => {
      const error = validateNumber(num);
      if (error) errors[`number${index}`] = error;
    });

    const checkboxError = validateCheckbox(checkboxValue);
    if (checkboxError) errors.checkboxValue = checkboxError;

    const checkboxError1 = validateCheckbox(checkboxValue1);
    if (checkboxError1) errors.checkboxValue1 = checkboxError1;


    // Kiểm tra tên
    const nameError = await validateText(text);
    if (nameError) errors.text = nameError;

    const descriptionError = await validateDescription(text);
    if (descriptionError) errors.description = descriptionError;





    return errors;
  };




  // Hàm xử lý khi nhấn Save
  const handleSave = async (event) => {
    event.preventDefault(); // Ngăn không cho trang tải lại

    const errors = await validateAllFields();  // Kiểm tra tất cả các trường
    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Cập nhật các lỗi nếu có
    } else {
      setErrors({}); // Nếu không có lỗi, xóa lỗi
      try {
        await handlePost(); // Tiến hành xử lý gửi dữ liệu
        formRef.current.submit();  // Submit form sau khi gửi thành công
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred while submitting the form.");
      }      
    }
  };


//   // Hàm tải ảnh lên backend
// const handleUploadImage = async (file) => {
//   // Tạo FormData để gửi file ảnh
//   const formData = new FormData();
//   formData.append('image', file); // Gửi file dưới tên 'image'

//   try {
//     // Gửi ảnh lên backend qua endpoint API /upload
//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData, // Dữ liệu ảnh được gửi trong body của yêu cầu
//     });

//     // Kiểm tra xem phản hồi từ backend có thành công không
//     if (response.ok) {
//       // Chuyển đổi phản hồi từ backend thành dữ liệu JSON
//       const data = await response.json();
      
//       // Trả về URL của ảnh từ backend (giả sử backend trả về trường imageUrl)
//       return data.imageUrl;
//     } else {
//       // Nếu có lỗi trong quá trình tải ảnh lên
//       throw new Error('Không thể tải ảnh lên, vui lòng thử lại');
//     }
//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error('Lỗi khi tải ảnh lên:', error);
//     throw error; // Ném lỗi để thông báo với người dùng hoặc xử lý sau
//   }
// };


  const handleCancel = (event) => {
    formRef.current.submit(); // Submit form nếu không có lỗi
  };

  const handlePost = async () => {
      // Loại bỏ bất kỳ giá trị nào có `_id` trong mảng `checkboxValue`
      const filteredCheckboxValues = checkboxValue.map((type) => {
        // Kiểm tra nếu type là một đối tượng có trường _id
        if (typeof type === 'object' && type._id) {
          return type.name; // Trả về chỉ tên của type
        }
        return type; // Nếu không phải đối tượng, giữ nguyên type
      });


      // Lọc những move đã được checkbox
      const selectedMoves = moves.filter((move) =>
        checkboxValue1.includes(move.name)
      );

      const selectedAbility = selectValue;
      const selectedEvolution = selectEvolution;


    const payload = { name: text ,
      description: description, // Ví dụ mô tả
      height: parseFloat(height), // Dữ liệu từ form
      weight: parseFloat(weight), // Dữ liệu từ form
      generation: 1, 
      base_stats: {
        hp: number, // Giá trị mẫu
        attack: number1,
        defense: number2,
        special_attack: number3,
        special_defense: number4,
        speed: number5,
      },
      type: filteredCheckboxValues,
      moves: selectedMoves,
      abilities: {
        _id: selectedAbility._id,  // Gửi _id
        name: selectedAbility.name, // Gửi name
        effect: selectedAbility.effect,  // Gửi description
      },
      // evolutions: {
      //   _id: selectedEvolution._id,
      //   to: selectedEvolution.name,
      //   method: "Level " + level
      // },
      

      
    }; // Dữ liệu từ form

    if (selectedEvolution && selectedEvolution.name) {
      payload.evolutions = {
        _id: selectedEvolution._id,
        to: selectedEvolution.name,
        method: "Level " + level,
      };
    }

    try {
      // Gửi yêu cầu POST đến API endpoint
      const response = await axios.post("http://localhost:8080/api/pokemon/", payload);
      
      // Ghi log kết quả trả về từ server
      console.log("Success:", response.data);
  
      // Hiển thị thông báo thành công
      alert("Pokemon created successfully!");
    } catch (error) {
      // Ghi log lỗi nếu xảy ra
      console.error("Error:", error.response?.data || error.message);
  
      // Hiển thị thông báo lỗi
      alert(error.response?.data?.message || "An error occurred!");
    }
  };
  



  return {
    height, selectEvolution, setSelectEvolution,
    setHeight, level, setLevel,
    weight, description, setDescription,
    setWeight,
    text,
    setText,
    selectValue, checkboxValue, checkboxValue1,
    setSelectValue, setCheckboxValue, setCheckboxValue1,
    number,
    setNumber,
    number1,number2, number3, number4, number5,
    setNumber1, setNumber2, setNumber3, setNumber4, setNumber5,
    errors,
    handleSave, handleCancel, handlePost,
    formRef,
  };
};

export default useFormValidation;
