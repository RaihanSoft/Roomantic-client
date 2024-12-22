import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/featured-rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching featured rooms:', error);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Featured Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map(room => (
          <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={room.imageUrl} alt={room.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
              <p className="text-yellow-500">Rating: {room.reviews.length}</p>
              <Link to={`/rooms/${room._id}`}>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedRooms;
