import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

import CertificateAddForm from './CertificateAddForm';
import CertificateList from './CertificateList';
import * as Api from '../../api';

/**
 * 작성자 - 이예슬
 ** certificate의 main component 
 * isEditable이 true일 경우 편집, 추가 버튼 활성화
 * isAdding이 true일 경우 AddForm 활성화

 */
function Certificate({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  // useState 훅을 통해 certificate 상태를 생성함
  const [certificate, setCertificate] = useState([]);

  useEffect(() => {
    // "certificates/유저id" 엔드포인트로 GET 요청을 하고, certificate를 response의 data로 세팅함.
    Api.get('certificatelist', portfolioOwnerId).then((res) =>
      setCertificate(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>자격증</Card.Title>
          <Card.Text>
            <CertificateList
              certificate={certificate}
              isEditable={isEditable}
              setCertificate={setCertificate}
              portfolioOwnerId={portfolioOwnerId}
            />
          </Card.Text>
          {isEditable && (
            <Col>
              <Row className='mt-3 text-center text-info my-3'>
                <Col sm={{ span: 20 }}>
                  <Button
                    variant='primary'
                    size='md'
                    onClick={() => setIsAdding(true)}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
          {isAdding ? (
            <CertificateAddForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
              certificate={certificate}
              setCertificate={setCertificate}
            />
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Certificate;
