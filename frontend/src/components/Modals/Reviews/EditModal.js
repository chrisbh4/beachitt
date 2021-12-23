import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReviewForm from '../../Reviews/EditReview';

function EditReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
