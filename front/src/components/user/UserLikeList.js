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
          <div id='likeUserList'>
            {likeList.map((user) => (
              <li key={user.id}>{user.name}
              <svg
              id='svgHeart'
              xmlns='http://www.w3.org/2000/svg'
              width='17'
              height='17'
              fill='currentColor'
              class='bi bi-heart-fill'
              viewBox='0 0 16 16'
            >
              <path
                fill-rule='evenodd'
                d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
              />
            </svg><hr /></li>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserLikeList;
