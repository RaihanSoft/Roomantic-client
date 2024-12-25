import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchFeaturedRooms = async () => {
      try {
        const response = await axios.get('https://mordern-hotel-booking-platform-server.vercel.app/featured-rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching featured rooms:', error);
      }
    };

    fetchFeaturedRooms();
  }, []);

  return (
    <div className="w-11/12 mx-auto mt-10 space-y-3 ">
      <h2 className="text-4xl font-bold text-center">Explore Our Best Rooms</h2>
      <p className='text-center'>Handpicked rooms designed for your comfort. Book yours today!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {rooms.map(room => (
          <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden mt-6 ">
            <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{room.name}</h3>
              <p className="text-gray-600 min-h-12 ">{room.description}</p>
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
