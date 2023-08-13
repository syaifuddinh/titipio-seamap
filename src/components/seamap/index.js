import React, { useState, useEffect } from "react";

function SeaMap({ locations = [], routeLine = [] }) {
    const [isLoading, setIsLoading] = useState(false);

    const loadCSS = () => {
        const isExist = document.getElementById("#leaflet-css");
        if(isExist) return;
        const el = document.createElement("link");
        const url = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
        el.setAttribute("rel", "stylesheet");
        el.setAttribute("id", "leaflet-css");
        el.setAttribute("href", url);
        document.head.append(el);
    }

    const loadJS = (callback) => {
        const isExist = document.getElementById("leaflet-map");
        if(!isExist) {
            const parent = document.createElement("script");
            const url = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
            parent.setAttribute("src", url);
            parent.setAttribute("id", "leaflet-map")
            window.document.body.append(parent)

            setTimeout(() => {

                const child = document.createElement("script");
                child.innerText = `
                    var map = L.map('map').setView([-6.2297465,106.829518], 13); \

                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        maxZoom: 5, 
                        attribution: '© OpenStreetMap contributors'
                    }).addTo(map);

                    var markers = [];
                    var polylines = [];
                `;

                child.setAttribute("id", "leaflet-controller")
                window.document.body.append(child)
                setIsLoading(true);
                if(callback) callback();
            }, 700); 
        }

    }

    const loadPolyline = () => {
        const id = "leaflet-polyline";
        const isExist = document.getElementById(id);
        const content = `
             ( () => {   
                if(!window.polylines) return;
                if(polylines.length > 0) {
                    polylines.forEach(data => {
                        map.removeLayer(data);
                    })
                }
                const coordinate = ${JSON.stringify(routeLine)};
                if(coordinate.length === 0) return;
                var polyline = L.polyline(coordinate, {color: 'red'}).addTo(map);
                polylines.push(polyline);
                map.fitBounds(polyline.getBounds());
            }) ()
        `;

        if(!isExist) {
            const el = document.createElement("script");
            el.setAttribute("id", id);
            el.innerText = content;

            window.document.body.append(el);
        } else {
            let el = document.querySelector("script#" + id);
            if(!el) return;
            el.remove();
            el = document.createElement("script");
            el.setAttribute("id", id);
            el.innerText += content;
            window.document.body.append(el);
        }
    }


    const loadMarker = () => {
        const id = "leaflet-marker";
        const isExist = document.getElementById(id);
        const content = `
             ( () => {   
                const locations = ${JSON.stringify(locations)};
                if(markers.length > 0) {
                    markers.forEach(marker => {
                        map.removeLayer(marker);
                    })
                }
                if(locations.length === 0) return;
                locations.forEach(({ locationName, latitude, longitude }) => {

                    const marker = L.marker([latitude, longitude]).addTo(map);
                    markers.push(marker);
                    marker.bindPopup(locationName).openPopup();
                });
            }) ()
        `;

        if(!isExist) {
            const el = document.createElement("script");
            el.setAttribute("id", id);
            el.innerText = content;

            window.document.body.append(el);
        } else {
            let el = document.querySelector("script#" + id);
            if(!el) return;
            el.remove();
            el = document.createElement("script");
            el.setAttribute("id", id);
            el.innerText += content;
            window.document.body.append(el);
        }
    }


    useEffect(() => {
        loadCSS();
        loadJS();
    }, []);

    useEffect(() => {
        if(isLoading === false) return;
        loadMarker();
    }, [isLoading, locations])

    useEffect(() => {
        if(isLoading === false) return;
        loadPolyline();
    }, [isLoading, routeLine])

  return (
    <div id="map" className="h-full"></div>    
  );
}

export default React.memo(SeaMap);
