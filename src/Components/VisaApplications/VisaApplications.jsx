import { useEffect, useState, useContext } from 'react';
import { Context } from '../Provider/Provider';
import Swal from 'sweetalert2';
import 'animate.css'; // Import animate.css for animations

const VisaApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(Context);

  // Fetch applications for the logged-in user
  useEffect(() => {
    if (user) {
      fetch(`https://assignment-ten-server-iota-tan.vercel.app/my-visa-applications?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setFilteredApplications(data); // Initialize filtered applications
        })
        .catch((err) => console.error('Error fetching applications:', err));
    }
  }, [user]);

  // Handle search functionality
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredApplications(applications); // Show all applications if query is empty
    } else {
      setFilteredApplications(
        applications.filter((app) =>
          app.countryName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setSearchQuery(''); // Reset the input field
  };

  // Handle application cancellation
  const handleCancel = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this application!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assignment-ten-server-iota-tan.vercel.app/cancel-application/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setApplications(applications.filter((app) => app._id !== id));
              setFilteredApplications(filteredApplications.filter((app) => app._id !== id));
              Swal.fire('Cancelled!', 'Your application has been cancelled.', 'success');
            }
          })
          .catch(() => Swal.fire('Error', 'Failed to cancel the application', 'error'));
      }
    });
  };

  return (
    <div className="p-8 w-11/12 mx-auto ">
      <h1 className="text-3xl font-bold text-center mb-8">My Visa Applications</h1>

      {/* Search Bar with luxurious design and animations */}
      <div className="flex justify-center items-center mb-6">
        <div className="relative animate__animated animate__fadeInDown animate__faster">
          <input
            type="text"
            placeholder="Search by country name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-l-full p-3 pl-5 w-80 text-gray-700 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <button
            onClick={handleSearch}
            className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-blue-500 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Visa Applications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app) => (
            <div key={app._id} className=" shadow-md rounded-lg p-5">
              <img
                src={app.countryImage}
                alt={app.countryName}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{app.countryName}</h2>
              <p>Visa Type: {app.visaType}</p>
              <p>Processing Time: {app.processingTime}</p>
              <p>Fee: ${app.fee} USD</p>
              <p>Validity: {app.validity} months</p>
              <p>Application Method: {app.applicationMethod}</p>
              <p>Applied Date: {app.appliedDate}</p>
              <p>Applicant: {app.firstName} {app.lastName}</p>
              <p>Email: {app.email}</p>
              <button
                onClick={() => handleCancel(app._id)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No applications found.</p>
        )}
      </div>
    </div>
  );
};

export default VisaApplications;
