import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import CertificateEditForm from './CertificateEditForm';
/**작성자 - 이예슬
 **기능 - certificate Card를 만들어준다
 * Card의 형태를 나타내줌
 */
function CertificateCard({
  certificate,
  isEditable,
  setCertificate,
  portfolioOwnerId,
}) {
  const { title, description, when_date } = certificate;
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setCertificate={setCertificate}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Card.Text>
          <Row className='align-items-center'>
            <Col>
              <span>{title}</span>
              <br />
              <span className='text-muted'>{description}</span>
              <br />
              <span className='text-muted'>{when_date}</span>
            </Col>
            {isEditable && (
              <Col xs lg='1'>
                <Button
                  variant='outline-info'
                  size='sm'
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  편집
                </Button>
              </Col>
            )}
          </Row>
        </Card.Text>
      )}
    </>
  );
}

export default CertificateCard;
