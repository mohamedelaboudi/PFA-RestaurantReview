import  { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import L from 'leaflet';
import axios from 'axios';

import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Fix the default icon issue with Leaflet in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const LocationMarker = ({ setAddress }) => {
    const [clickedLocation, setClickedLocation] = useState(null);

    useMapEvents({
        click: async (e) => {
            const { lat, lng } = e.latlng;

            // Reverse Geocoding using OpenStreetMap Nominatim API
            try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
                    params: {
                        format: 'json',
                        lat,
                        lon: lng,
                    },
                });

                const { display_name } = response.data;
                setClickedLocation({ lat, lng, address: display_name });
                setAddress(display_name);
            } catch (error) {
                console.error("Error fetching the address:", error);
            }
        },
    });

    return (
        <>
            {clickedLocation && (
                <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
                    <Popup>
                        {clickedLocation.address}
                    </Popup>
                </Marker>
            )}
        </>
    );
};

const AddressMap = ({ setAddress }) => {
    return (
        <div className="h-screen w-full relative">
            <div className="map-container md:h-96 h-full md:w-full w-3/4 mx-auto">
                <MapContainer center={[35.5738, -5.3726]} zoom={13} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <LocationMarker setAddress={setAddress} /> {/* Pass setAddress as a prop */}
                </MapContainer>
            </div>
        </div>
    );
};
AddressMap.propTypes = {
    setAddress: PropTypes.object.isRequired,
  };
LocationMarker.propTypes = {
    setAddress: PropTypes.object.isRequired,
  };
export default AddressMap;
