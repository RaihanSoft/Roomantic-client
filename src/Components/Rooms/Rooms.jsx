import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "rc-slider"; // Add rc-slider package for the range slider
import "rc-slider/assets/index.css"; // Import the slider styles
import { Context } from "../Provider/Provider";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]); // Initial range [min, max]
  const [sortOption, setSortOption] = useState(""); // State for sorting
  const [showFilter, setShowFilter] = useState(false); // For toggling the dropdown
  const { loading, setLoading } = useContext(Context);
  const dropdownRef = useRef(null); // Reference to the dropdown

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const url = `https://mordern-hotel-booking-platform-server.vercel.app/rooms?minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
        sortOption ? `&sort=${sortOption}` : ""
      }`;
      console.log("Fetching from URL:", url); // Debugging URL

      const response = await fetch(url);
      const data = await response.json();
      
      // If backend doesn't support sorting, sort on frontend
      const sortedRooms = [...data].sort((a, b) => {
        if (sortOption === "asc") return a.price - b.price;
        if (sortOption === "desc") return b.price - a.price;
        return 0;
      });

      setRooms(sortedRooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [priceRange, sortOption]); // Fetch rooms whenever price range or sorting changes

  const handlePriceChange = (range) => setPriceRange(range);

  const applyFilters = () => {
    fetchRooms();
    setShowFilter(false);
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSortOption("");
    fetchRooms();
    setShowFilter(false);
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

  const handleSortChange = (event) => {
    const value = event.target.value;
    console.log("Selected sort option:", value); // Debugging
    setSortOption(value);
  };

  return (
    <div className="rooms-page relative">
      <div className="dropdown p-4 relative flex justify-center" ref={dropdownRef}>
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="w-full max-w-md text-left bg-white text-black border p-3 rounded-lg shadow-lg font-semibold text-lg flex justify-between items-center"
        >
          Price Range <span>{showFilter ? "▲" : "▼"}</span>
        </button>

        {showFilter && (
          <div
            className="lg:w-1/3 filter-section absolute left-1/2 transform -translate-x-1/2 top-full mt-2 p-6 bg-white rounded-lg shadow-lg z-50"
            style={{ zIndex: 1000 }}
          >
            <h2 className="text-xl text-black font-bold mb-4">Price Range</h2>
            <div className="text-center mb-4">
              <p className="text-lg font-semibold text-black">
                <span className="border-2 p-1">${priceRange[0].toFixed(2)}</span> -{" "}
                <span className="border-2 p-1">${priceRange[1].toFixed(2)}</span>
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

      {/* Sorting Dropdown */}
      <div className="flex justify-center">
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="bg-white text-black border p-1 rounded-lg shadow-lg font-semibold"
        >
          <option value="">Sort By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Rooms List */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full text-green-500 border-green-500 border-t-transparent"></div>
          <p className="ml-4 text-xl font-semibold">Loading rooms...</p>
        </div>
      ) : (
        <div className="rooms-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <Link
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
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="min-h-12">{room.description}</p>
                  <p className="mt-2 text-lg font-semibold text-blue-600">
                    Price: ${room.price}
                  </p>
                  <p className="mt-2 text-sm">Reviews: {room.reviews.length}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-xl font-semibold text-gray-600">
              No rooms available in this price range.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
