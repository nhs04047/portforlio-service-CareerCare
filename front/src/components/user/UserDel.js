import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

import * as Api from '../../api';
import { DispatchContext, UserStateContext } from '../../App';

function UserDel() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const ownerId = userState.user.id;

  const dispatch = useContext(DispatchContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = async (e) => {
    e.preventDefault();
    // console.log(userState.user);

    await Api.del('users', ownerId);

    await sessionStorage.removeItem('userToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    alert('정상적으로 탈퇴되었습니다!');
  };

  return (
    <>
      <div onClick={handleShow}>회원 탈퇴</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          정말로 탈퇴하시겠습니까? 탈퇴 시 회원정보는 복구 불가능합니다.
        </Modal.Body>
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

export default UserDel;
