import React, { useState } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import * as Api from '../../api';
import PrivateCheck from '../private/PrivateCheck';

// 수상이력 추가 컴포넌트 - 작성자: 이영우
// 기능 - user id를 api에 요청, 입력값을 바탕으로 award 카드를 추가합니다.
// 완성여부 - placeholder이 현재 값으로 뜨지 않는 것 제외, 완성했습니다.

function AwardAddForm({ portfolioOwnerId, setAwards, setAddAward }) {
  //useState로 title 상태를 생성해야함
  const [title, setTitle] = useState('');
  //useState로 description 상태를 생성해야함
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = portfolioOwnerId;
    // "award/create" end-point로 post요청
    await Api.post('award/create', {
      user_id: portfolioOwnerId,
      title,
      description,
      isPrivate,
    });
    // "awardlist/유저id" end-point로 get요청
    const res = await Api.get('awardlist', user_id);
    // awards를 response -> data로 세팅
    setAwards(res.data);
    // Add 모드가 끝남, addAward를 false로 세팅
    setAddAward(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          type='text'
          placeholder='수상내역'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <Form.Control
          type='text'
          placeholder='상세내역'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mt-3'>
        <PrivateCheck isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
      </Form.Group>

      <Form.Group className='mt-3 text-center mb-4'>
        <Col sm={{ span: 20 }}>
          <Button variant='primary' type='submit' className='me-3'>
            확인
          </Button>
          <Button variant='secondary' onClick={() => setAddAward(false)}>
            {' '}
            {/*취소를 누르면 add모드 종료*/}
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
