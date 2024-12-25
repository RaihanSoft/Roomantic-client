import { useState } from 'react';
import Modal from 'react-modal';
import image from '../assets/banner-3.webp';

const Offers = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="z-50">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="20% Discount on Hotel Bookings"
        style={{
          content: {
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '15px',
            textAlign: 'center',
            zIndex: '1000',
            backgroundColor: '#fff',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            maxWidth: '500px',
            width: '90%',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: '999',
          },
        }}
      >
        <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Enjoy 20% Off on Your Next Hotel Booking!</h2>
        <div className="mb-2">
          <img
            src={image}
            alt="Special Offer"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            style={{ marginBottom: '20px' }}
          />
          <p className="text-lg text-gray-700 ">
            Don&apos;t miss out on this exclusive 20% discount! Book your stay today and save big on selected hotels.
          </p>
        </div>
        <button
          onClick={closeModal}
          style={{
            padding: '12px 25px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
          }}
          className="hover:scale-110 transform transition-all duration-300"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Offers;
