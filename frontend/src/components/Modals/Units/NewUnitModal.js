import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import NewUnitForm from '../../../components/RentalUnitsPage/NewUnit/NewUnitForm';
// import NewUnitForm from '../../RentalUnitsPage/NewUnit/NewUnitForm';
import NewUnitForm from "../../RentalUnitsPage/NewUnit/NewUnitForm"


function NewUnitModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        List Your Property
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative w-full h-full max-w-none bg-transparent">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <NewUnitForm submitModal={setShowModal}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewUnitModal;
