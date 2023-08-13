import React from "react";
import GraySearch from "../../../assets/icons/gray-search.svg"

const TextInput = ({ placeholder, value, className = "", onChange, onFocus }) => {
    const onDataChange = e => {
        const newValue = e.target.value;
        onChange(newValue);
    }

    return (
            <div className={`input-container border-b-2  border-gray-500 flex items-center ${className}`}>
                <input
                    type="text"
                    className="appearance-none w-full py-2 px-4 text-gray-700 leading-tight "
                    placeholder={placeholder}
                    onChange={onDataChange}
                    onFocus={onFocus}
                    value={value}
                />

                <img
                    src={GraySearch}
                    loading="lazy"
                    className="_control"
                /> 
            </div>
    )
}

export default React.memo(TextInput);