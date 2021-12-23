import React, { useState } from 'react';
import { Modal } from '../../../context/Modal';
// import NewUnitForm from '../../../components/RentalUnitsPage/NewUnit/NewUnitForm';
// import NewUnitForm from '../../RentalUnitsPage/NewUnit/NewUnitForm';
import NewUnitForm from "../../RentalUnitsPage/NewUnit/NewUnitForm"


function NewUnitModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Register your rental</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NewUnitForm />
        </Modal>
      )}
    </>
  );
}

export default NewUnitModal;
