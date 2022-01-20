import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditBookingPage from '../../Booking-Cal/EditBooking';

function EditBookingModal({bookingId}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Booking</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditBookingPage bookingId={bookingId}/>
        </Modal>
      )}
    </>
  );
}

export default EditBookingModal;
