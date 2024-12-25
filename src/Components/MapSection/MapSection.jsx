import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import axios from 'axios';

const MapSection = () => {
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState([37.7749, -122.4194]); // Set to San Francisco, CA

  useEffect(() => {
    const fetchHotelLocations = async () => {
      try {
        const response = await axios.get('https://mordern-hotel-booking-platform-server.vercel.app/hotel-locations');
        setLocations(response.data);
        if (response.data.length > 0) {
          setCenter([response.data[0].latitude, response.data[0].longitude]);
        }
      } catch (error) {
        console.error('Error fetching hotel locations:', error);
      }
    };

    fetchHotelLocations();
  }, []);

  return (
    <div>
      <div className='flex flex-col items-center justify-center space-y-3 mt-10 text-center'>
        <h2 className='text-4xl font-bold'>Explore Our Location</h2>
        <p>Find us in the heart of the city. Explore the map to see how close we are to popular attractions.</p>
      </div>
      <div className="map-section  h-96 mt-10 w-11/12 mx-auto border-gray-400 border-2">
        <MapContainer center={center} zoom={4} scrollWheelZoom={true} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations.map((location, index) => (
            <Marker key={index} position={[location.latitude, location.longitude]}>
              <Popup>
              <h3 className="font-bold">{location.name}</h3>
                <div className="text-center">
                  <img src={location.Limage} alt={location.name} className="w-full h-32 object-cover mt-2" />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapSection;





