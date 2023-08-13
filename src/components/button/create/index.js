import React from "react";

function CreateButton({ label, variant = "primary", onClick, className, disabled = false }) {
    const baseColor = variant === "primary" ? "blue-500" : (variant === "secondary" ? "green-400" : "")
    const onDataClick = () => {
        if(disabled === true) return;
        onClick();
    }

    return (
            <div
                className={`${disabled === false ? "cursor-pointer  bg-" + baseColor + " text-white" : "cursor-not-allowed bg-gray-400"} text-xs text-center w-40  py-3 px-5 rounded-lg  font-semibold inline-block ${className}`}
                onClick={onDataClick}
            >
                { label }
            </div>
    )
}

export default React.memo(CreateButton);
