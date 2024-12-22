import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch top-rated rooms from the backend (replace with actual API call)
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/featured-rooms'); // Replace with your backend URL
        if (!response.ok) throw new Error('Failed to fetch rooms');
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="featured-rooms-section container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="room-card bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-4">{room.description}</p>
              <p className="text-lg font-bold text-blue-600 mb-4">${room.price} per night</p>
              <button
                onClick={() => navigate(`/rooms/${room._id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
