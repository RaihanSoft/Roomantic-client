import { useState } from 'react';
import Modal from 'react-modal';
import image from '../assets/banner-3.webp';

const Offers = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className='z-50'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Special Offers and Promotions"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            zIndex: '1000'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: '999'
          }
        }}
      >
        <h2>Special Offers and Promotions</h2>
        <div>
          <img src={image} alt="Special Offer" style={{ width: '300px', marginBottom: '20px' }} />
          <p>Don&apos;t miss out on our exclusive deals!</p>
        </div>
        <button onClick={closeModal} style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default Offers;
