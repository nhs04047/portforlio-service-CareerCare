import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateEditForm({ certificate, setIsEditing, setCertificate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [whenDate, setWhenDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Api.put(`certificates/${certificate.id}`, {
      title,
      description,
      whenDate,
    });
    //프로젝트 정보는 res.data
    const updatedProject = res.data;
    //해당 프로젝트 정보로 project 세팅함
    setCertificate(updatedProject);
    //isEditing을 false로 세팅함
    setIsEditing(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='useEditProjectTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditProjectDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='userEditProjectDate'>
            <Col sm={{ span: 20 }}>
              <DatePicker
                style={{ width: '5rem' }}
                selected={whenDate}
                onChange={(date) => setWhenDate(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CertificateEditForm;
