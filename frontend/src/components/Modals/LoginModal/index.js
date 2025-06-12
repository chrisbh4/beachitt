import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import LoginFormPage from "../../LoginFormPage"

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-1 rounded-full hover:bg-gray-50 transition-colors duration-200"
      >
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginFormPage />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
