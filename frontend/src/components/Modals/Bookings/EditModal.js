import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditBookingPage from '../../Booking-Cal/EditBooking';

function EditBookingModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingPage />
        </Modal>
      )}
    </>
  );
}

export default EditBookingModal;
