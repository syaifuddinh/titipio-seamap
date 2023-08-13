import Api from "../utils/api";
import { renderRouteToUrl } from "../utils/route"
import { convertSecondsToDaysHours } from "../utils/time"

const getCoordinateRouting = async ({ rawRoutes = [] }) => {
    let outp = {};
    try {
        const routes = renderRouteToUrl(rawRoutes);
        const url = "/route/v2/sea/" + routes + "?continuousCoordinates=false&allowIceAreas=false&avoidHRA=false&avoidSeca=false";
        const resp = await Api.get(url);
        outp = resp.data;
        const { features } = outp;
        let duration = 0;
        if(features.length > 0) {
            features.forEach(feature => {
                duration += feature?.properties?.duration;
            })
        }
        const { days, hours } = convertSecondsToDaysHours(duration);
        const journeyDuration = `${days} Days ${hours} Hours`;
        outp.journeyDuration = journeyDuration;
    } catch(e) {
        throw new Error(e);
    }

    return outp;
}

export default {  getCoordinateRouting };