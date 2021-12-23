import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
import EditUnitForm from '../../RentalUnitsPage/EditRentalUnit/Edit';

function EditUnitModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Your Rental</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditUnitForm />
        </Modal>
      )}
    </>
  );
}

export default EditUnitModal;
