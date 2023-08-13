import React from "react";

const TextInput = ({ placeholder, onChange, value }) => {
    return (
            <div className="border-b-2  border-gray-500">
                <input
                    type="text"
                    className="appearance-none w-full py-2 px-4 text-gray-700 leading-tight "
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value}
                />
            </div>
    )
}

export default React.memo(TextInput);