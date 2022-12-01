import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";
import * as mapboxgl from "mapbox-gl";
import $ from "jquery";
import select2 from 'select2';
import 'select2/dist/css/select2.css'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import settings from "./settings.json";
import custom from "./custom-style.json";
import drivers from "./drivers.json";
import vehicles from "./vehicles.json";
select2($);
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
        let filter = [
            "all"
        ];
        const dates = datefilter.selectedDates;
        const driver = driverSelect.val();
        const vehicle = vehicleSelect.val();
        const shift = $('input[name="shift"]:checked').val();
        if (dates.length === 2) {
            filter = filter.concat([
                [">=", ['get', 'trip_date'], dates[0].toISOString()],
                ["<=", ['get', 'trip_date'], dates[1].toISOString()]
            ]);
        }
        if (driver !== "All Drivers") {
            if (driver === "Driver Not Found") filter.push(['!', ['to-boolean', ['get', 'drivername']]]);
            else filter.push(['==', ['get', 'drivername'], driver]);
        }
        if (vehicle !== "All Vehicles") filter.push(['==', ['get', 'vehiclename'], vehicle]);
        if (shift !== "all") filter.push(['==', ['get', 'shift'], shift]);
        if (filter.length === 1) filter = null;
        map.setFilter('vehicle_paths', filter);
    };

    const pathLayers = ['vehicle_paths']
    map.on('click', pathLayers, (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<table>
                <tr>
                    <th>Vehicle Name</th>
                    <td>${e.features[0].properties.vehiclename}</td>
                </tr>
                <tr>
                    <th>Driver Name</th>
                    <td>${e.features[0].properties.drivername || "Driver Not Found"}</td>
                </tr>
                <tr>
                    <th>Trip Date</th>
                    <td>${new Date(e.features[0].properties.trip_date).toLocaleDateString()}</td>
                </tr>
                <tr>
                    <th>Trip Age (days)</th>
                    <td>${e.features[0].properties.trip_age}</td>
                </tr>
                <tr>
                    <th>Shift</th>
                    <td>${e.features[0].properties.shift}</td>
                </tr>
            </table>`)
            .addTo(map);
    });

    map.on('mousemove', pathLayers, () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', pathLayers, () => {
        map.getCanvas().style.cursor = '';
    });

    const datefilter = flatpickr('#rangeDate', {
        mode: 'range',
        dateFormat: "m/d/Y",
        onChange: updateFilters
    });

    vehicleSelect.on('change', updateFilters);
    driverSelect.on('change', updateFilters);
    $('input[name="shift"]').on('change', updateFilters);
}

mapboxgl.accessToken = settings.accessToken;
map = new mapboxgl.Map(settings);
map.on("load", init);

drivers.unshift('Driver Not Found');
drivers.unshift('All Drivers');
const driverSelect = $('#driver-select').select2({
    width: "100%",
    data: drivers
});
vehicles.unshift('All Vehicles');
const vehicleSelect = $('#vehicle-select').select2({
    width: "100%",
    data: vehicles
});
