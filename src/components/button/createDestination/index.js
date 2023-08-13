import React from "react";
// import BluePlus from "../../../assets/icons/blue-plus.svg";
import BluePlus from "../../../assets/icons/blue-plus.js";
import GrayPlus from "../../../assets/icons/gray-plus.js";

function CreateDestinationButton({ label, onClick, className, disabled = false }) {
    const onDataClick = () => {
        if(disabled === true) return;
        onClick();
    }

    return (
            <div
                className={`${disabled === false ? "cursor-pointer  text-blue-500 text-white" : "cursor-not-allowed text-gray-400"} flex items-center gap-3 ${className}`}
                onClick={onDataClick}
            >

                { disabled === false && (
                    <BluePlus size={20} />
                ) }

                { disabled === true && (
                    <GrayPlus size={20} />
                ) }

                <div
                    className={`text-sm w-40  font-semibold inline-block`}
                >
                    Add Destination
                </div>
            </div>
    )
}

export default React.memo(CreateDestinationButton);
