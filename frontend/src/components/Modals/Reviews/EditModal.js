import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditReviewForm from '../../Reviews/EditReview';

function EditReviewModal({ reviewId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditReviewForm id={reviewId} submitModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
