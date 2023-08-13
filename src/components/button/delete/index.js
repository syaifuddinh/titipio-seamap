import React from "react";
import DeleteIcon from "../../../assets/icons/gray-close.svg";

function DeleteButton({  onClick, className }) {

    return (
            <div
                className={`cursor-pointer ${className}`}
                onClick={onClick}
            >
                <img
                    src={DeleteIcon}
                    alt="delete-icon"
                    loading="lazy"
                    style={{ height: "1.25rem", width: "auto" }}
                />
            </div>
    )
}

export default React.memo(DeleteButton);
