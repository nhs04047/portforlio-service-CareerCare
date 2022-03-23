import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import * as Api from '../../api';
import PrivateCheck from '../PrivateCheck';

function EducationEditForm({ setEdit, setEducations, education }) {
  //학교 이름, 전공, 졸업 정보 상태 세팅
  const [school, setSchool] = useState(education.school);
  const [major, setMajor] = useState(education.major);
  const [position, setPosition] = useState(education.position);
  const [isPrivate, setIsPrivate] = useState(education.isPrivate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = education.user_id;
    // "educations/education id" end-point로 PUT 요청
    await Api.put(`educations/${education.id}`, {
      user_id,
      school,
      major,
      position,
      isPrivate,
    });
    // "educationlist/유저id" end-point로 GET 요청
    const res = await Api.get('educationlist', user_id);
    // educations를 response -> data로 세팅
    setEducations(res.data);
    // Edit 모드 종료, Edit모드를 false로
    setEdit(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder='학교 이름'
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Control
          type='text'
          placeholder='전공'
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </Form.Group>

      <Form.Check
        className='mt-3'
        inline
        type='radio'
        name='position'
        label='재학중'
        value='재학중'
        checked={position === '재학중'}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type='radio'
        name='position'
        label='학사졸업'
        value='학사졸업'
        checked={position === '학사졸업'}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type='radio'
        name='position'
        label='석사졸업'
        value='석사졸업'
        checked={position === '석사졸업'}
        onChange={(e) => setPosition(e.target.value)}
      />
      <Form.Check
        inline
        type='radio'
        name='position'
        label='박사졸업'
        value='박사졸업'
        checked={position === '박사졸업'}
        onChange={(e) => setPosition(e.target.value)}
      />

      <Form.Group className='mt-3'>
        <PrivateCheck isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
      </Form.Group>

      <Form.Group className='mt-3 text-center mb-4'>
        <Col sm={{ span: 20 }}>
          <Button variant='primary' type='submit' className='me-3'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setEdit(false)}>
            {' '}
            {/*취소를 누르면 Edit모드 종료*/}
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default EducationEditForm;
