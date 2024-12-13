import React from 'react';

const RadioButton = ({ options, name, selectedValue, onChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center text-white">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
            className="form-radio h-4 w-4 cursor-pointer border-gray-300 text-yellow-500 checked:bg-yellow-500 focus:ring-yellow-500 focus:ring-opacity-50"
          />
          <span className="ml-2 text-white">{option.label}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButton;
