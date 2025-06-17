import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import NewReviewForm from '../../Reviews/NewReviewForm';

function NewReviewModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Write a Review
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewReviewForm submitModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default NewReviewModal;
