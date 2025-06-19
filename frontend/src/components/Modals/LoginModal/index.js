import React, { useState } from 'react';
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
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full max-w-md bg-transparent">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute -top-2 -right-2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <LoginFormPage submitModal={setShowModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginFormModal;
