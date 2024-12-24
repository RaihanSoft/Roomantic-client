import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider"; // Add rc-slider package for the range slider
import "rc-slider/assets/index.css"; // Import the slider styles

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]); // Initial range [min, max]
  const [showFilter, setShowFilter] = useState(false); // For toggling the dropdown
  const dropdownRef = useRef(null); // Reference to the dropdown

  const fetchRooms = async () => {
    const response = await fetch(
      `https://mordern-hotel-booking-platform-server.vercel.app/rooms?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    );
    const data = await response.json();
    setRooms(data);
  };


  useEffect(() => {
    fetchRooms();
  }, []);

  const handlePriceChange = (range) => {
    setPriceRange(range);
  };

  const applyFilters = () => {
    fetchRooms();
    setShowFilter(false); // Close dropdown after applying filters
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    fetchRooms();
    setShowFilter(false); // Close dropdown after clearing filters
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="rooms-page relative">
      <div className="dropdown p-4 relative flex justify-center" ref={dropdownRef}>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="w-full max-w-md text-left bg-white border p-3 rounded-lg shadow-lg font-semibold text-lg flex justify-between items-center"
        >
         Price Range
          <span>{showFilter ? "▲" : "▼"}</span>
        </button>

        {showFilter && (
          <div
            className=" lg:w-1/3  filter-section absolute left-1/2 transform -translate-x-1/2 top-full mt-2 p-6 bg-white rounded-lg shadow-lg z-50"
            style={{ zIndex: 1000 }}
          >
            <h2 className="text-xl font-bold mb-4">Price Range</h2>
            <div className="text-center mb-4">
              <p className="text-lg font-semibold">
              <span className="border-2 p-1" >  ${priceRange[0].toFixed(2)}</span> - <span className="border-2 p-1" >${priceRange[1].toFixed(2)}</span>
              </p>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <div className="w-3/4">
                <Slider
                  range
                  min={0}
                  max={5000}
                  step={0.01}
                  value={priceRange}
                  onChange={handlePriceChange}
                  trackStyle={{ backgroundColor: "#4caf50", height: 4 }}
                  handleStyle={[
                    { backgroundColor: "#4caf50", borderColor: "#4caf50" },
                    { backgroundColor: "#4caf50", borderColor: "#4caf50" },
                  ]}
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={clearFilters}
                className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-800"
              >
                Clear
              </button>
              <button
                onClick={applyFilters}
                className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-800"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="rooms-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {rooms.map((room) => (
          <Link
            room={room}
            key={room._id}
            to={`/rooms/${room._id}`}
            className="room-card border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
          >
            <img
              src={room.image}
              alt={room.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{room.name}</h3>
              <p className="text-gray-600">{room.description}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Price: ${room.price}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Reviews: {room.reviews.length}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoomsPage;
