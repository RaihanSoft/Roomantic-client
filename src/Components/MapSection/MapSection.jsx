import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSection = () => {
  const position = [51.505, -0.09]; // Replace with the hotel's actual coordinates

  return (
    <div className="map-section w-full h-96 mt-10">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            Our Hotel Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapSection;
