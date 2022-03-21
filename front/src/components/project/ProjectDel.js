import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Api from '../../api';

function ProjectDel({ project, portfolioOwnerId, setProject }) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = async () => {
    setShow(false);
    await Api.del(`projects/${project.id}`);
  };

  // useEffect(() => {
  //   const asynchronous = async () => {
  //     await Api.del(`projects/${project.id}`);
  //     // await Api.get('projectlist', portfolioOwnerId).then((res) =>
  //     //   setProject(res.data)
  //     // );
  //   };
  //   asynchronous();
  // }, [show]);

  return (
    <>
      <Button variant='outline-info' size='sm' onClick={handleShow}>
        삭제
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>프로젝트 삭제</Modal.Title>
        </Modal.Header>
        <Modal.Body>정말로 삭제하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProjectDel;
