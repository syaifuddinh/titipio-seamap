import React from "react";
import BlueVessel from "../../assets/icons/blue-vessel.svg"

function Logo() {
    return (
        <div className="flex gap-3 items-start">
            <img
                src={BlueVessel}
                alt="Logo"
                style={{height: "1.8rem", width: "auto"}}
            />

            <div className="font-semibold text-blue-700 text-2xl">
                    SEAMAP
            </div>
        </div>
    )
}

export default React.memo(Logo);
