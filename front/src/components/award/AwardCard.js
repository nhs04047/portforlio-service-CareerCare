import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import AwardDel from './AwardDel';

// 수상이력 카드 컴포넌트 - 작성자: 이영우
// 기능 - title, description을 props로 받아와 입력받은 값을 화면에 표시해줍니다.
// 완성여부 - placeholder이 현재 값으로 뜨지 않는 것 제외, 완성했습니다.

function AwardCard({ setAwards, isEditable, setEdit, award }) {
  return (
    <Card.Text>
      <Row className='align-items-center'>
        <Col>
          <span>{award.title}</span>
          <br />
          <span className='text-muted'>{award.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg='1'>
            <Button
              variant='outline-info'
              size='sm'
              className='mr-3'
              onClick={() => setEdit((cur) => !cur)}
            >
              편집
            </Button>
            <div className='mb-2' />
            <AwardDel award={award} setAwards={setAwards} />
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
