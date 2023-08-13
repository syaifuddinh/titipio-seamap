import { useState, useEffect } from "react";
import { generateId } from '../utils/string';

const useInput = () => {
    const initiateInputs = () => {
        const outp = [];
        let i = 0;
        for(i = 0;i < 2;i++) {
            const id = generateId();
            const value = "";
            const placeholder = i < 1 ? "Choose Starting Point" : "Choose Destination";
            const portName = "";
            const latitude = "";
            const longitude = "";
            outp.push({ id, value, placeholder, portName, latitude, longitude })
        }

        return outp;
    }

    const [inputs, setInputs] = useState(initiateInputs);
    const [pointedInputId, setPointedInputId] = useState("");
    const [isSearchDisabled, setIsSearchDisabled] = useState(false);
    const [portListKeyword, setPortListKeyword] = useState("");

    const addDestination = () => {
            const id = generateId();
            const value = "";
            let placeholder =  "Choose Destination";
            setInputs(() => [...inputs, { id, value, placeholder }])
    }

    const setUpPortListKeyword = () => {
        if(!pointedInputId) return;
        const pointedInput = inputs.find(({ id }) => id === pointedInputId);
        if(!pointedInput) return;
        setPortListKeyword(pointedInput.value);
    }

    const onPortDelete = (pointedId) => {
        if(inputs.length < 3) return;
        setInputs(
            oldVal => oldVal.filter(({ id }) => id !== pointedId).map((val, index) => {
                const placeholder = index === 0 ? "Choose Starting Point" : val.placeholder;
                return {...val, placeholder};
            })
        )
    }

    useEffect(() => {
        setUpPortListKeyword();
    }, [pointedInputId, inputs]);

    useEffect(() => {
        setIsSearchDisabled(() => {
            if(!inputs[0].portName) return true
            if(inputs.filter(({ portName }) => portName).length < 2) return true

            return false
        });
    }, [inputs]);

    return { 
        initiateInputs, 
        inputs, 
        setInputs, 
        pointedInputId,  
        setPointedInputId, 
        isSearchDisabled,  
        addDestination, 
        setPortListKeyword,
        portListKeyword,
        onPortDelete
    };
}

export default useInput;