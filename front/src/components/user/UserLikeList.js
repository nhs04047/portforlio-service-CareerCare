import React, { useState } from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import * as Api from '../../api';

function UserLikeList({ portfolioOwnerId, user }) {
  const [likeList, setLikeList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setShow(true);

    const res = await Api.get(`likelist/${portfolioOwnerId}`);
    setLikeList(res.data.liked);
  };

  return (
      <>
        <Button onClick={handleClick} className="btn btn-secondary">좋아요 한 사람</Button>
        <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
            <Modal.Title>좋아요 한 사람</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
        {likeList.map((user) => (
          <li key={user.id}>{user.name}</li> 
        ))}
      </div>
        </Modal.Body>
        </Modal>
      </>
  );
}

export default UserLikeList;
