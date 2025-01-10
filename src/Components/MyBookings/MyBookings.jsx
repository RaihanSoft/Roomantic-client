import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../Provider/Provider';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../UseAxiosSecure/UseAxiosSecure';


const MyBookingsPage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(Context);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newBookingDate, setNewBookingDate] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState();
  const [isUpdateDateModalOpen, setIsUpdateDateModalOpen] = useState(false);
  const [currentTimestamp, setCurrentTimestamp] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch the current user's bookings (replace with actual API call)
    const fetchBookings = async () => {
      try {
        axiosSecure.get(`/myBookings?email=${user.email}`)
          .then((response) => { setBookings(response.data); })

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user.email, axiosSecure]);

  const handleCancelBooking = async (bookingId) => {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      // Cancel booking logic
      try {
        const response = await fetch(`https://mordern-hotel-booking-platform-server.vercel.app/bookings/${bookingId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to cancel booking');
        }
        // Remove canceled booking from the list
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
        Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');
      } catch (err) {
        Swal.fire('Error!', err.message, 'error');
      }
    }
  };

  const handleUpdateBookingDate = async (bookingId) => {
    if (!newBookingDate) {
      Swal.fire('Error!', 'Please select a valid date', 'error');
      return;
    }
    // Update booking date logic
    try {
      const response = await fetch(`https://mordern-hotel-booking-platform-server.vercel.app/bookings/${bookingId}`, {
        method: 'PUT',
        body: JSON.stringify({ date: newBookingDate.toISOString() }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to update booking date');
      // Update the booking in the list
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, date: newBookingDate.toISOString() } : booking
        )
      );
      Swal.fire('Updated!', 'Booking date updated successfully!', 'success');
      setIsUpdateDateModalOpen(false);
    } catch (err) {
      Swal.fire('Error!', 'Error updating booking date', err);
    } finally {
      setNewBookingDate(null);
    }
  };

  const handleReviewSubmit = async (roomId) => {
    if (reviewText && rating > 0 && rating <= 5) {
      const newReview = {
        username: user.displayName, // Replace with logged-in user
        rating,
        comment: reviewText,
        timestamp: new Date().toISOString(), // Add timestamp here
        profilePic: user.photoURL, // Replace with logged-in user
      };
      try {
        const response = await fetch(`https://mordern-hotel-booking-platform-server.vercel.app/rooms/${roomId}/reviews`, {
          method: 'POST',
          body: JSON.stringify(newReview),
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to submit review');
        Swal.fire('Submitted!', 'Review submitted successfully!', 'success');
        setIsReviewModalOpen(false);
      } catch (err) {
        Swal.fire('Error!', 'Error submitting review', err);
      }
    } else {
      Swal.fire('Error!', 'Please fill in both rating (1-5) and review', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (

  


    <div className="my-bookings-page w-full p-3 sm:w-11/12 mt-10 mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="hidden sm:table w-full border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-2 border text-sm sm:text-base">Image</th>
                <th className="px-2 py-2 border text-sm sm:text-base">Name</th>
                <th className="px-2 py-2 border text-sm sm:text-base">Price</th>
                <th className="px-2 py-2 border text-sm sm:text-base">Booking Date</th>
                <th className="px-2 py-2 border text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-2 py-2 border">
                    <img
                      src={booking.imageUrl || 'https://via.placeholder.com/100'}
                      alt={booking.roomName}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                    />
                  </td>
                  <td className="px-2 py-2 border text-sm sm:text-base">{booking.roomName}</td>
                  <td className="px-2 py-2 border text-sm sm:text-base">${booking.price}</td>
                  <td className="px-2 py-2 border text-sm sm:text-base">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-2 border">
                    {/* Flex container for actions */}
                    <div className="flex flex-col lg:flex-row gap-2">
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="bg-red-500 text-white py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { setSelectedBooking(booking); setIsReviewModalOpen(true); }}
                        className="bg-green-500 text-white py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto"
                      >
                        Review
                      </button>
                      <button
                        onClick={() => { setSelectedBooking(booking); setIsUpdateDateModalOpen(true); setNewBookingDate(new Date(booking.date)); }}
                        className="bg-blue-500 text-white py-2 px-4 rounded text-sm sm:text-base w-full sm:w-auto"
                      >
                        Update Date
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card Layout for Small Devices */}
          <div className="sm:hidden">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white shadow-lg rounded-lg mb-6 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={booking.imageUrl || 'https://via.placeholder.com/100'}
                    alt={booking.roomName}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{booking.roomName}</h3>
                    <p className="text-sm text-gray-500">Price: ${booking.price}</p>
                    <p className="text-sm text-gray-500">Booking Date: {new Date(booking.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {/* Actions in Card Format */}
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded w-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => { setSelectedBooking(booking); setIsReviewModalOpen(true); }}
                    className="bg-green-500 text-white py-2 px-4 rounded w-full"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => { setSelectedBooking(booking); setIsUpdateDateModalOpen(true); setNewBookingDate(new Date(booking.date)); }}
                    className="bg-blue-500 text-white py-2 px-4 rounded w-full"
                  >
                    Update Date
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      <Modal isOpen={isCancelModalOpen} onRequestClose={() => setIsCancelModalOpen(false)} className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Confirm Cancellation</h2>
        <p>Are you sure you want to cancel this booking?</p>
        <button
          onClick={() => handleCancelBooking(selectedBooking._id)}
          className="bg-red-600 text-white py-2 px-4 rounded mt-4 w-full sm:w-auto"
        >
          Confirm Cancel
        </button>
        <button
          onClick={() => setIsCancelModalOpen(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-4 w-full sm:w-auto"
        >
          Cancel
        </button>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={isReviewModalOpen} onRequestClose={() => setIsReviewModalOpen(false)} className="max-w-lg mx-auto">
        <div className='mt-16 p-5 bg-black ' >
          <h2 className="text-2xl font-bold text-white">Write a Review</h2>
          <div className="">
            <label className="block text-white text-sm font-bold mb-2">Username</label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full p-4 border border-gray-300 rounded mb-4"
            />
          </div>
          <div className="">
            <label className="block text-white text-sm font-bold mb-2">Rating (1-5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded mb-4"
            />
          </div>
          <p className='text-white font-bold mb-2 '>Review</p>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            className="w-full p-4 border border-gray-300 rounded"
          />
          <div className="">
            <label className="block text-white text-sm font-bold mb-2">Timestamp</label>
            <input
              type="text"
              value={currentTimestamp}
              readOnly
              className="w-full p-4 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={() => handleReviewSubmit(selectedBooking.roomId)}
              className="bg-green-600 text-white py-2 px-4 rounded w-full sm:w-auto"
            >
              Submit Review
            </button>
          </div>
        </div>
      </Modal>

      {/* Update Booking Date Modal */}
      <Modal isOpen={isUpdateDateModalOpen} onRequestClose={() => setIsUpdateDateModalOpen(false)} className="max-w-lg mx-auto">
        <div className='mt-32 p-10 bg-black ' >
          <h2 className="text-2xl font-bold mb-4 text-white ">Update Booking Date</h2>
          <DatePicker
            selected={newBookingDate}
            onChange={(date) => setNewBookingDate(date)}
            className="w-full p-4 border border-gray-300 rounded mb-4"
          />
          <br />
          <button
            onClick={() => handleUpdateBookingDate(selectedBooking._id)}
            className="bg-blue-600 text-white py-2 px-4 rounded w-full sm:w-auto"
          >
            Update Date
          </button>
        </div>
      </Modal>
    </div>


  );
};

export default MyBookingsPage;