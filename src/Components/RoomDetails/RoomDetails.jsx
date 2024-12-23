import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Provider/Provider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import { Rating } from 'react-simple-star-rating';

const RoomDetailsPage = () => {
  const { id } = useParams(); // Room ID from the route parameter
  const { user } = useContext(Context);
  const [room, setRoom] = useState(null); // Stores room details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [bookingDate, setBookingDate] = useState(new Date()); // Booking date state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Booking modal state

  // Fetch room details from the backend
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`https://mordern-hotel-booking-platform-server.vercel.app/rooms/${id}`); // Replace with your backend URL
        if (!response.ok) throw new Error("Failed to fetch room details.");
        const data = await response.json();
        setRoom(data); // Save the room details to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetails();
  }, [id]);

  // Handle booking confirmation
  const handleBookingConfirm = async () => {
    try {
      const response = await fetch(`https://mordern-hotel-booking-platform-server.vercel.app/book-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomId: id,
          userId: user.uid,
          userEmail: user.email,
          imageUrl: room.image,
          roomName: room.name,
          price: room.price,
          date: bookingDate,
        }),
      });
      if (!response.ok) throw new Error("Failed to book the room.");
      alert('Room booked successfully!');
      setIsBookingModalOpen(false);
      setRoom((prevRoom) => ({ ...prevRoom, availability: false }));
    } catch (err) {
      alert(err.message);
    }
  };



  // Display loading spinner or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="room-details-page container mx-auto p-6">
      {/* Room Details Section */}
      <div className="room-info flex flex-col md:flex-row gap-6">
        <img
          src={room.image || 'https://via.placeholder.com/400'}
          alt={room.name}
          className="w-full md:w-1/2 h-96 object-cover rounded-lg"
        />
        <div className="room-details w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{room.description}</p>
          <p className="text-xl font-semibold text-blue-600 mb-4">Price: ${room.price}</p>
          <p className="text-md text-gray-600 mb-4">
            <strong>Availability:</strong> {room.availability ? "Available" : "Not Available"}
          </p>
          <ul className="text-gray-700">
            <li><strong>Category:</strong> {room.category}</li>
            <li><strong>Location:</strong> {room.location.name}</li>
            <li><strong>Max Guests:</strong> {room.maxGuests}</li>
          </ul>
          {room.availability && (
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
              onClick={() => setIsBookingModalOpen(true)}
            >
              Book Now
            </button>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {room.reviews && room.reviews.length > 0 ? (
          room.reviews.map((review, index) => (
            <div key={index} className="review border-b border-gray-300 py-4">
              <p className="text-lg font-semibold">{review.username}</p>
              <p className="text-gray-600">
                <strong>Rating:</strong> {review.rating} / 5
              </p>
              <Rating ratingValue={review.rating * 20} readonly size={20} />
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500">{new Date(review.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available for this room yet. Be the first to leave a review!</p>
        )}
      </div>


      {/* Booking Modal */}
      <Modal
        isOpen={isBookingModalOpen}
        onRequestClose={() => setIsBookingModalOpen(false)}
        contentLabel="Booking Modal"
      >
        <h2 className="text-2xl font-semibold mb-4">Booking Summary</h2>
        <p><strong>Room:</strong> {room.name}</p>
        <p><strong>Price:</strong> ${room.price}</p>
        <p><strong>Description:</strong> {room.description}</p>
        <div className="mt-4">
          <label className="block text-gray-700">Select Booking Date:</label>
          <DatePicker
            selected={bookingDate}
            onChange={(date) => setBookingDate(date)}
            className="mt-2 p-2 border rounded-md"
          />
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
          onClick={handleBookingConfirm}
        >
          Confirm Booking
        </button>
      </Modal>


    </div>
  );
};

export default RoomDetailsPage;
