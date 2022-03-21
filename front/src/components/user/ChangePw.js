import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function ChangePw({ user, setEditingPw, setUser }) {
  const [pw, setPw] = useState(false);
  const [newPw, setNewPw] = useState("")
  const [confirmNewPw, setConfirmNewPw] = useState("");
  
  const curPwCheck = pw.length >= 1;
  const pwLengthCheck = newPw.length >= 4;
  const pwSameCheck = confirmNewPw === newPw;
  const pwCheckAll = pwLengthCheck && pwSameCheck && curPwCheck;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`현재 비밀번호 : ${pw}`)
    console.log(`새 비밀번호 : ${newPw}`)

    // // "users/유저id" 엔드포인트로 PUT 요청함.
    // const res = await Api.put(`users/${user.id}`, {
    //     pw,
    // });
    // // 유저 정보는 response의 data임.
    // const updatedUser = res.data;
    // // 해당 유저 정보로 user을 세팅함.
    // setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setEditingPw(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              autoComplete="on"
              placeholder='현재 비밀번호'
              onChange={(e) => setPw(e.target.value)}
            />
             {!curPwCheck && (
                <Form.Text className="text-success">
                  현재 비밀번호를 입력하세요.
                </Form.Text>
              )}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Control
              type='password'
              autoComplete="on"
              placeholder='새 비밀번호'
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
            {!pwLengthCheck && (
                <Form.Text className="text-success">
                  비밀번호는 4글자 이상입니다.
                </Form.Text>
              )}
          </Form.Group>

          <Form.Group>
            <Form.Control
              type='password'
              autoComplete="on"
              placeholder='새 비밀번호 확인'
              onChange={(e) => setConfirmNewPw(e.target.value)}
            />
            {!pwSameCheck && (
                <Form.Text className="text-success">
                  비밀번호가 일치하지 않습니다.
                </Form.Text>
              )}
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3' disabled={!pwCheckAll}>
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
