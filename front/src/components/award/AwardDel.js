import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Api from '../../api';

function AwardDel({ award, setAwards }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (e) => {
    e.preventDefault();
    const user_id = award.user_id;

    await Api.del(`awards/${award.id}`);

    const res = await Api.get('awardlist', user_id);
    const updatedAward = res.data;

    await setAwards(updatedAward);
    setShow(false);
  };

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={handleShow}>
        삭제
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>수상이력 삭제</Modal.Title>
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

export default AwardDel;
