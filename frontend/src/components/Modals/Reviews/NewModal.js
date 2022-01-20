import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewReviewForm from '../../Reviews/NewReviewForm';


function NewReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Leave a review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewReviewForm submitModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewReviewModal;
