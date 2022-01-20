import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditUnitForm from '../../RentalUnitsPage/EditUnit/Edit';

function EditUnitModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Your Rental</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUnitForm submitModal={setShowModal} />
        </Modal>
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
