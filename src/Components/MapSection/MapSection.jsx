import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';


import axios from 'axios';

const MapSection = () => {
  const [locations, setLocations] = useState([]);
  console.log(locations)

  useEffect(() => {
    const fetchHotelLocations = async () => {
      try {
        const response = await axios.get('https://mordern-hotel-booking-platform-server.vercel.app/hotel-locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching hotel locations:', error);
      }
    };

    fetchHotelLocations();
  }, []);

  return (
    <div className="map-section w-full h-96 mt-10">
      <MapContainer center={[0, 0]} zoom={2} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location, index) => (
          <Marker key={index} position={[location.latitude, location.longitude]}>
            <Popup>
              {location.name}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapSection;


