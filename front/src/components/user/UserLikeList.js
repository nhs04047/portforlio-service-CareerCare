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
    setLikeList(res.data.liked);
  };

  return (
    <div className='ms-5'>
      <Button onClick={handleClick} variant='outline-dark'>
        Who Likes?
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Who Likes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {likeList.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserLikeList;
