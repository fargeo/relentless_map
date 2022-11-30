import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import settings from "./settings.json";
import custom from "./custom-style.json";

let map;

async function init() {
    const style = map.getStyle();

    style.sources = {
        ...style.sources,
        ...custom.sources
    };
    style.layers.push(...custom.layers);
    map.setStyle(style);

    map.addControl(new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        bbox: [
            -86.31092854091077, 38.255831759695326,
            -78.77605534835592, 42.42310884088013
        ]
    }));

    map.addControl(new mapboxgl.NavigationControl());

    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    }));

    document.querySelector('.expand-filters').addEventListener('click', () => {
        const form = document.querySelector('#filter-form');
        form.classList.toggle('expanded');
    });

    const updateFilters = () => {
        let filter = null;
        const dates = datefilter.selectedDates;
        const vehicleID = vehicleFilter.value;
        if (vehicleID) {
            filter = ['==', ['get', 'vehicleid'], vehicleID]
        }
        if (dates.length === 2) {
            const dateFilter = [
                "all",
                [">=", ['get', 'trip_date'], dates[0].toISOString()],
                ["<=", ['get', 'trip_date'], dates[1].toISOString()]
            ];
            if (filter) {
                dateFilter.push(filter);
            }
            filter = dateFilter;
        }
        map.setFilter('vehicle_paths', filter);
    };

    map.on('click', 'vehicle_paths', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<table>
                        <tr>
                            <th>Vehicle ID</th>
                            <td>${e.features[0].properties.vehicleid}</td>
                        </tr>
                        <tr>
                            <th>Vehicle Name</th>
                            <td>${e.features[0].properties.vehiclename}</td>
                        </tr>
                        <tr>
                            <th>Driver ID</th>
                            <td>${e.features[0].properties.driverid}</td>
                        </tr>
                        <tr>
                            <th>Driver Name</th>
                            <td>${e.features[0].properties.drivername}</td>
                        </tr>
                        <tr>
                            <th>Trip Date</th>
                            <td>${e.features[0].properties.trip_date}</td>
                        </tr>
                        <tr>
                            <th>Trip Age</th>
                            <td>${e.features[0].properties.trip_age}</td>
                        </tr>
                        <tr>
                            <th>Shift</th>
                            <td>${e.features[0].properties.shift}</td>
                        </tr>
                    </table>`)
            .addTo(map);
    });

    const datefilter = flatpickr('#rangeDate', {
        mode: 'range',
        dateFormat: "Y-m-d",
        onChange: updateFilters
    });

    const vehicleFilter = document.querySelector('#vehicleID');
    vehicleFilter.addEventListener('keyup', updateFilters);
}

mapboxgl.accessToken = settings.accessToken;
map = new mapboxgl.Map(settings);
map.on("load", init);
