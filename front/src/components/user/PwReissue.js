import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';

import * as Api from '../../api';

function PwReissue() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [idEmail, setIdEmail] = useState("");
  const [idName, setIdName] = useState("");
  const validateEmail = (idEmail) => {
    return idEmail
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(idEmail);
  const idInpCheck = idName.length >= 1;
  const checkAll = isEmailValid && idInpCheck;

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSend = async (e) => {
    e.preventDefault();
    await Api.post(`users/newpassword`, {
        idEmail,
        idName,
      });
    navigate('/');
    alert('이메일을 발송하였습니다!');
  };

  return (
    <>
       <label>비밀번호를 잊으셨나요?</label>
      <Button onClick={handleShow}>비밀번호 재발급</Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 재발급</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Control
              type='email'
              autoComplete='on'
              placeholder='이메일'
              value={idEmail}
              onChange={(e) => setIdEmail(e.target.value)}
            />
            {!isEmailValid && (
                <Form.Text className="text-success">
                  이메일 형식이 올바르지 않습니다.
                </Form.Text>
              )}
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              autoComplete='on'
              placeholder='이름'
              onChange={(e) => setIdName(e.target.value)}
            />
              {!idInpCheck && (
                <Form.Text className='text-success'>
                  가입 시 이름을 입력하세요. 
                </Form.Text>
              )}
          </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleSend} disabled={!checkAll}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PwReissue;
