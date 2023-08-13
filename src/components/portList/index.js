import React, { useState, useEffect } from "react";
import Ports from "../../store/seaports.json"
import DeleteButton from "../../components/button/delete"

function PortList({ keyword = "", onPortSelected, onClose }) {
    const [filteredPorts, setFilteredPorts] = useState(Ports);

    const searchPort = () => {
        if(!keyword) {
            setFilteredPorts(Ports);
            return;
        }
        const keywordParam = keyword.toLowerCase();
        setFilteredPorts(
            () => {
                let outp = Ports;
                outp = Ports.filter(({ name }) => name.toLowerCase().search(keywordParam) > -1);

                return outp;
            }
        )
    }

    useEffect(() => {
        searchPort()
    }, [keyword])

  return (
    <div className="port-list-container absolute w-full bg-white">
        <div className="port-list-container_heading flex justify-end p-3">
            <DeleteButton
                onClick={onClose}
            />
        </div>
        <div className="port-list-container_parent absolute w-full">
            { filteredPorts.map(port => (
                <div
                    key={port.name}
                    className="port-list-container_item bg-white p-3 font-medium text-xs cursor-pointer hover:bg-blue-400 hover:text-white border-gray-200"
                    onClick={() => onPortSelected(port)}
                >
                    { port.name }
                </div>
            )) }
        </div>
    </div>
  );
}

export default React.memo(PortList);
