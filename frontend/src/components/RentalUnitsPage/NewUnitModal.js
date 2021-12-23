import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NewUnitForm from './NewUnitForm';

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
