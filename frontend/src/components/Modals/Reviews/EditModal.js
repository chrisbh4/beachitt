import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReviewForm from '../../Reviews/EditReview';

function EditReviewModal({reviewId}) {
  const [showModal, setShowModal] = useState(false);
  // const reviewId = reviewId

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm id={reviewId} submitModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
