import { useState, useRef } from "react";
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
const validateText = (text) => {
  const specialCharRegex = /[^a-zA-Z0-9\s]/; // Regex phát hiện ký tự đặc biệt
  if (!text || text.trim() === "") {
    return "Name must not be empty."; // Kiểm tra chuỗi rỗng hoặc chỉ chứa khoảng trắng
  }
  if (specialCharRegex.test(text)) {
    return "Name must not contain special characters."; // Kiểm tra ký tự đặc biệt
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

const useFormValidation = () => {
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

  const [errors, setErrors] = useState({});    // State lưu thông báo lỗi
  const formRef = useRef(null);

  // Hàm xử lý khi nhấn Save
  const handleSave = (event) => {
    event.preventDefault(); // Ngăn không cho trang tải lại
    // Kiểm tra lỗi cho từng biến
    const errors = {};
    const weightError = validateWeight(weight);
    if (weightError) errors.weight = weightError;

    const heightError = validateHeight(height);
    if (heightError) errors.height = heightError;

    const textError = validateText(text);
    if (textError) errors.text = textError;

    const selectError = validateSelect(selectValue);
    if (selectError) errors.select = selectError;

    const numberError = validateNumber(number);
    if (numberError) errors.number = numberError;
  
    const numberError1 = validateNumber(number1);
    if (numberError1) errors.number1 = numberError1;

    const numberError2 = validateNumber(number2);
    if (numberError2) errors.number2 = numberError2;

    const numberError3 = validateNumber(number3);
    if (numberError3) errors.number3 = numberError3;

    const numberError4 = validateNumber(number4);
    if (numberError4) errors.number4 = numberError4;

    const numberError5 = validateNumber(number5);
    if (numberError5) errors.number5 = numberError5;

    const checkboxError = validateCheckbox(checkboxValue);
    if (checkboxError) errors.checkboxValue = checkboxError;

    const checkboxError1 = validateCheckbox(checkboxValue1);
    if (checkboxError1) errors.checkboxValue1 = checkboxError1;

    if (Object.keys(errors).length > 0) {
      setErrors(errors); // Cập nhật các lỗi nếu có
    } else {
      setErrors({}); // Xóa lỗi nếu không có
      console.log("Form submitted successfully!", { height, weight });
      // Thực hiện hành động Save
      formRef.current.submit(); // Submit form nếu không có lỗi
    }
  };

  const handleCancel = (event) => {
    formRef.current.submit(); // Submit form nếu không có lỗi
  };

  return {
    height,
    setHeight,
    weight,
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
    handleSave, handleCancel,
    formRef,
  };
};

export default useFormValidation;
