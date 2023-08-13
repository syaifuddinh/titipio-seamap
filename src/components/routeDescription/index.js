import GrayVessel from "../../assets/icons/gray-vessel.svg"

function RouteDescription({ departure, arrival, duration }) {
    return (
        <div className="route-description px-4 py-4 rounded-md bg-white">
            <div className="flex justify-between gap-2">
                <div className="route-description_departure font-medium text-xs">
                    { departure }
                </div>

                <div className="route-description_duration text-xs">
                    <div className="route_description_duration__label text-center">
                        { duration }
                    </div>

                    <div className="route_description_duration__image mt-2 flex justify-center gap-2">
                        <img
                            src={GrayVessel}
                            alt="vessel"
                            loading="lazy"
                        />
                        <img
                            src={GrayVessel}
                            alt="vessel"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="route-description_arrival font-medium text-xs">
                    { arrival }
                </div>
            </div>
        </div>
    )
}

export default RouteDescription;
