import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

/**작성자 - 이예슬
 **기능 - user id를 api에 요청, 입력값을 바탕으로 certificate 카드 수정
 */
function CertificateEditForm({ certificate, setCertificate, setIsEditing }) {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [when_date, setWhen_date] = useState(new Date(certificate.when_date));

  // new Date로 생성한 date에서 yyyy-mm-dd로 date form을 주는 함수
  function filterDate(d) {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = certificate.user_id;
    await Api.put(`certificates/${certificate.id}`, {
      user_id,
      title,
      description,
      when_date: filterDate(when_date),
    });

    const res = await Api.get('certificatelist', user_id);
    const updatedCertificate = res.data;
    setCertificate(updatedCertificate);
    setIsEditing(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='certificateEditTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='자격증 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='certificateEditDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='certificateEditDate'>
            <Col sm={{ span: 20 }}>
              <DatePicker
                dateFormat='yyyy/MM/dd'
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
