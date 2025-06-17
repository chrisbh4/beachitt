import React, { useState } from 'react';
import EditUnitForm from '../../RentalUnitsPage/EditUnit/Edit';

function EditUnitModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="inline-flex items-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Edit Rental
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
                <EditUnitForm submitModal={setShowModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditUnitModal;


/*
option 1: Modal Form State
            - Have the showModal/setShowModal be a react state
            - have it always be set to false when a form is not opened
            - when a form is clicked

*/
