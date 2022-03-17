import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateAddForm({ portfolioOwnerId, setIsAdding, setCertificate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [when_date, setWhen_date] = useState(new Date());
  function filterDate(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    await Api.post('certificate/create', {
      user_id,
      title,
      description,
      when_date: filterDate(when_date),
    });
    //자격증 정보는 res.data
    const res = await Api.get('certificatelist', user_id);
    const updatedProject = res.data;
    //해당 자격증 정보로 project 세팅함
    setCertificate(updatedProject);
    //isEditing을 false로 세팅함
    setIsAdding(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='certificateAddTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='자격증 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='certificateAddDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='certificateAddDate'>
            <Col sm={{ span: 20 }}>
              <DatePicker
                style={{ width: '5rem' }}
                selected={when_date}
                onChange={(date) => setWhen_date(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsAdding(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CertificateAddForm;
