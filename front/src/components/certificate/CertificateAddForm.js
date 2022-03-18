import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function CertificateAddForm({
  portfolioOwnerId,
  setIsAdding,
  setCertificate,
  certificate,
}) {
  /**
   * test위해 initial state를 임의로 작성해놓음
   * backend와 연결 후 정상작동 시 주석 코드로 대체 예정
   */
  // useState로 title, description, when_date 생성
  //   const [title, setTitle] = useState(certificate.title);
  //   const [description, setDescription] = useState(certificate.description);
  //   const [when_date, setWhenDate] = useState(certificate.when_date);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [when_date, setWhenDate] = useState(new Date());
  function filterDate(d) {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    if (title !== '') {
      await Api.post('certificate/create', {
        user_id: portfolioOwnerId,
        title,
        description,
        when_date: filterDate(when_date),
      });
      const res = await Api.get('certificatelist', user_id);
      //자격증 정보는 res.data
      const updatedCertificate = res.data;
      //해당 자격증 정보로 project 세팅함
      setCertificate(updatedCertificate);
      console.log(certificate);
      //isEditing을 false로 세팅함
      setIsAdding(false);
    } else {
      console.log('내용이 없습니다!', 'color: #bada55');
    }
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
                dateFormat='yyyy/MM/dd'
                selected={when_date}
                onChange={(date) => setWhenDate(date)}
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
