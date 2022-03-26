import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

import PrivateCheck from '../private/PrivateCheck';

/**작성자 - 이예슬
 ** certificate 추가 컴포넌트
 *기능 - user id를 api에 요청, 입력값을 바탕으로 certificate 카드 추가
 */
function CertificateAddForm({
  portfolioOwnerId,
  setIsAdding,
  certificate,
  setCertificate,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [when_date, setWhen_date] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState(false);

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
        isPrivate,
      });
      const res = await Api.get('certificatelist', user_id);
      const updatedCertificate = res.data;
      setCertificate(updatedCertificate);
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
                onChange={(date) => setWhen_date(date)}
              />
            </Col>
          </Form.Group>
          <Form.Group className='mt-3'>
            <PrivateCheck isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
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
