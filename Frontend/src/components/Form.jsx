import React, { useState } from "react";

const Form = ({ formTitle, formData, handleChange, handleSubmit }) => {
  const [errors, setErrors] = useState({
    name: "",
    countryCode: "",
    phoneNumber: "",
  });
 

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };

    // Name cheklc: letter only no number
    if (!formData.name.trim()) {
      errorsCopy.name = "Name is required";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.name.trim())) {
      errorsCopy.name = "Name should contain only alphabetic characters";
      valid = false;
    } else {
      errorsCopy.name = "";
    }

    // Country code check
    if (!formData.countryCode.trim()) {
      errorsCopy.countryCode = "Country Code is required";
      valid = false;
    } else {
      errorsCopy.countryCode = "";
    }

    // Phone number check: numbers only no alphabet
    if (!formData.phoneNumber.trim()) {
      errorsCopy.phoneNumber = "Phone Number is required";
      valid = false;
    } else if (!/^\d+$/.test(formData.phoneNumber.trim())) {
      errorsCopy.phoneNumber = "Phone Number should contain only numeric characters";
      valid = false;
    } else {
      errorsCopy.phoneNumber = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    localStorage.setItem("formData", JSON.stringify(formData));
    handleSubmit(event);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${errors.name ? "border-red-500" : ""}`}
            placeholder="Enter Name"
          />
          {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="countryCode" className="block text-sm font-medium text-gray-700">
            Country Code
          </label>
          <select
            id="countryCode"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${errors.countryCode ? "border-red-500" : ""}`}
          >
            <option value="">Select Country Code</option>
            <option value="+91">+91 (India)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+44">+44 (United Kingdom)</option>
            <option value="+61">+61 (Australia)</option>
            <option value="+81">+81 (Japan)</option>
            <option value="+49">+49 (Germany)</option>
            <option value="+33">+33 (France)</option>
            <option value="+86">+86 (China)</option>
            <option value="+7">+7 (Russia)</option>
            <option value="+55">+55 (Brazil)</option>
            <option value="+39">+39 (Italy)</option>
            <option value="+27">+27 (South Africa)</option>
          </select>
          {errors.countryCode && <p className="mt-2 text-sm text-red-500">{errors.countryCode}</p>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border rounded-md ${errors.phoneNumber ? "border-red-500" : ""}`}
            placeholder="Enter Phone Number"
          />
          {errors.phoneNumber && <p className="mt-2 text-sm text-red-500">{errors.phoneNumber}</p>}
        </div>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 font-semibold text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
