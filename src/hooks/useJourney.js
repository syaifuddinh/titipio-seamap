import { useState } from "react";

const useJourney = (inputs) => {
    const journeyInitiation = { isShow: false, duration: "", departure: "", arrival: "" };
    const [journey, setJourney] = useState(journeyInitiation)

    const setUpJourney = (duration) => {
        const isShow = true;
        const departure = inputs[0].portName;
        const arrival = inputs[inputs.length - 1].portName;
        setJourney({...journey, isShow, departure, arrival, duration });
    }

    return { journeyInitiation, journey, setJourney, setUpJourney };
}

export default useJourney;