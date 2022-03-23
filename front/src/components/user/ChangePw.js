import React, { useContext, useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { DispatchContext } from '../../App';

import * as Api from '../../api';

function ChangePw({ user, setEditingPw, setUser }) {
  const [pw, setPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');
  const navigate = useNavigate();

  const curPwCheck = pw.length >= 1;
  const pwLengthCheck = newPw.length >= 4;
  const pwSameCheck = confirmNewPw === newPw;
  const pwCheckAll = pwLengthCheck && pwSameCheck && curPwCheck;

  const dispatch = useContext(DispatchContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //"users/password:id" PUT 요청
    const res = await Api.put(`users/password/${user.id}`, {
      pw,
      newPw,
    });
    console.log(user.id);
    const updatedUser = res.data;
    if (!updatedUser) {
      alert('현재 비밀번호가 일치하지 않습니다.');
      window.location = '/';
    } else {
      alert('비밀번호가 변경되었습니다!');
      // window.location = '/login';
    }
    setUser(updatedUser);
    setEditingPw(false);

    await sessionStorage.removeItem('userToken');
    dispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <Card className='mb-2 ms-3'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              autoComplete='on'
              placeholder='현재 비밀번호'
              onChange={(e) => setPw(e.target.value)}
            />
            {!curPwCheck && (
              <Form.Text className='text-success'>
                현재 비밀번호를 입력하세요.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              autoComplete='on'
              placeholder='새 비밀번호'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
            {!pwLengthCheck && (
              <Form.Text className='text-success'>
                비밀번호는 4글자 이상입니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='password'
              autoComplete='on'
              placeholder='새 비밀번호 확인'
              onChange={(e) => setConfirmNewPw(e.target.value)}
            />
            {!pwSameCheck && (
              <Form.Text className='text-success'>
                비밀번호가 일치하지 않습니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button
                variant='primary'
                type='submit'
                className='me-3'
                disabled={!pwCheckAll}
              >
                확인
              </Button>
              <Button variant='secondary' onClick={() => setEditingPw(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ChangePw;
