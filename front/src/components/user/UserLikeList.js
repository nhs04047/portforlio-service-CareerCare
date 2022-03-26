import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import * as Api from '../../api';

function UserLikeList({ portfolioOwnerId, user }) {
  const [likeList, setLikeList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);

    const res = await Api.get(`likelist/${portfolioOwnerId}`);
    setLikeList(res);
    console.log(likeList);
  };

  return (
      <>
        <Button onClick={handleClick} className="btn btn-secondary">좋아요 목록</Button>
        <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
            <Modal.Title>좋아요</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        </Modal.Body>
        </Modal>
      </>
  );
}

export default UserLikeList;
