import { useState } from "react";
import SeaMap from './components/seamap';
import TextInput from './components/input/text';
import CreateButton from './components/button/create';
import DeleteButton from './components/button/delete';
import CreateDestinationButton from './components/button/createDestination';
import RouteDescription from "./components/routeDescription"
import PortList from "./components/portList";
import Logo from "./components/logo";
import RouteService from './services/route';
import useInput from "./hooks/useInput";
import useJourney from "./hooks/useJourney";
import "./assets/css/index.scss"
import { ToastMessage } from "react-toastr";

function App() {
    const { initiateInputs, inputs, setInputs, pointedInputId,  setPointedInputId, isSearchDisabled, addDestination, portListKeyword, setPortListKeyword, onPortDelete } = useInput(); 
    const { journeyInitiation, journey, setJourney, setUpJourney } = useJourney(inputs);
    const [isShowPortList, setIsShowPortList] = useState(false);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [routeLine, setRouteLine] = useState([]);

    const onPortSelected = ({ name, latitude, longitude }) => {
        if(!pointedInputId) return;
        const pointedIndex = [...inputs].findIndex(({ id }) => id === pointedInputId);
        if(pointedIndex < 0) return;
        const newContents = [...inputs];
        newContents[pointedIndex].value = name
        newContents[pointedIndex].portName = name
        newContents[pointedIndex].latitude = latitude
        newContents[pointedIndex].longitude = longitude;
        setInputs(newContents);
        onPortListClose();
    }

    const getRoute = async () => {
        try {
            const rawRoutes = inputs.filter(({ portName }) => portName).map(({ latitude, longitude }) => {
                return { latitude, longitude }
            });
            const { features, journeyDuration } = await RouteService.getCoordinateRouting({ rawRoutes });
            if(features.length < 1) return;
            const routes = features.map(feature => {
                const { geometry } = feature;
                let coordinates = geometry.coordinates;
                coordinates = coordinates.map(coordinate => coordinate.map(latLong => [ latLong[1], latLong[0] ] ));

                return coordinates[0];
            })
            setRouteLine(routes);
            setUpJourney(journeyDuration);
        } catch(e) {
            alert(e.message);
        }
    }

    const onPortSubmit = () => {
        setInputs(oldVal => oldVal.map(val => {
            const value = val.portName ? val.portName : val.value;
            return {...val, value};
        }))

        setSelectedLocations(() => {
            return inputs
                .filter(({ portName }) => portName)
                .map(({ latitude, longitude, portName }) => {
                    const locationName = portName;
                    return { locationName, latitude, longitude }
                })
        })

        setInputs(oldVal => oldVal.filter(({ portName }) => portName));


        setIsShowPortList(false);

        getRoute();
    }

    const onInputHover = (inputId) => {
        setPointedInputId(inputId);
        setIsShowPortList(true);
    }

    const onPortListClose = () => {
        setIsShowPortList(false);
        setPointedInputId("");
        setPortListKeyword("");
    }

    const onPortChange = (pointedId, newValue) => {
        const pointedIndex = [...inputs].findIndex(({ id }) => id === pointedId)
        if(pointedIndex < -1) return;
        const newInputs = [...inputs];
        newInputs[pointedIndex].value = newValue;
        setInputs(() => newInputs);
    }

    const onReset = () => {
        setInputs(initiateInputs);
        setJourney(journeyInitiation);
        setSelectedLocations([]);
        setRouteLine([]);
    }

  return (
    <div className="block sm:flex absolute h-full w-full">
        <div className="sidebar w-full sm:w-1/2 md:w-1/3">
            <div className="sidebar_heading p-3">
                    <div className="sidebar_heading__logo">
                            <Logo />
                    </div>
                { inputs.map(input => (
                    <div className="sidebar_heading__input">
                            <TextInput
                                key={input.id}
                                placeholder={input.placeholder}
                                value={input.value}
                                className="flex-1"
                                onChange={newValue => onPortChange(input.id, newValue)}
                                onFocus={() => onInputHover(input.id)}
                            />

                            <DeleteButton
                                onClick={() => onPortDelete(input.id)}
                            />
                    </div>
                )) }

                <CreateDestinationButton
                    disabled={inputs.length > 5}
                    className="mt-3"
                    onClick={addDestination}
                />

                <div className="flex gap-2 mt-3">
                    <CreateButton
                        label="Search"
                        disabled={isSearchDisabled}
                        onClick={onPortSubmit}
                    />

                    <CreateButton
                        label="Reset"
                        variant="secondary"
                        onClick={onReset}
                    />
                </div>
            </div>

            <div className="sidebar_content relative bg-gray-200 h-full pt-3">
                { isShowPortList === true && (
                    <PortList
                        keyword={portListKeyword}
                        onPortSelected={onPortSelected}
                        onClose={onPortListClose}
                    />
                ) }
                { journey.isShow === true && (
                    <div className="sidebar_content__routes px-3 pb-3">
                        <RouteDescription
                            departure={journey.departure}
                            arrival={journey.arrival}
                            duration={journey.duration}
                        />
                    </div>
                ) }
            </div>      
        </div>
        <div className="_content h-full w-full sm:w-1/2 md:w-2/3 relative">
            <SeaMap
                locations={selectedLocations}
                routeLine={routeLine}
            />
        </div>

    </div>
  );
}

export default App;
