import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Api from '../../api';

function CertificateDel({ certificate, setCertificate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (e) => {
    e.preventDefault();
    const user_id = certificate.user_id;

    await Api.del(`certificates/${certificate.id}`);

    const res = await Api.get('certificatelist', user_id);
    const updatedProject = res.data;

    setCertificate(updatedProject);
    setShow(false);
  };

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={handleShow}>
        삭제
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>자격증 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CertificateDel;
