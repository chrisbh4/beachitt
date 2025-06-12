import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './index';

function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors duration-200"
      >
        Sign up
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;
