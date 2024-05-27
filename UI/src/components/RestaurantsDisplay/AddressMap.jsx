//mapusercomponant
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import PropTypes from 'prop-types';

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
const AddressMap = ({ address }) => {
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const geocodeAddress = async () => {
        try {
          const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
            params: {
              format: 'json',
              q: address,
            },
          });
  
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setLocation([parseFloat(lat), parseFloat(lon)]);
            console.log(`Coordinates for "${address}":`, [lat, lon]);
          } else {
            console.error("No results found for the address");
          }
        } catch (error) {
          console.error("Error fetching the coordinates:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching coordinates
        }
      };
  
      if (address) {
        geocodeAddress();
      }
    }, [address]);
  
    return (
      <div className="h-[340px]  w-full relative">
        <div className="map-container md:h-96 h-full md:w-full w-3/4 mx-auto">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <MapContainer center={location || [51.505, -0.09]} zoom={13} className="h-[350px] w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {location && (
                <Marker position={location}>
                  <Popup>
                    Location for: <br /> {address}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          )}
        </div>
      </div>
    );
  };
  AddressMap.propTypes = {
    address: PropTypes.object.isRequired,
  };
  
export default AddressMap;
