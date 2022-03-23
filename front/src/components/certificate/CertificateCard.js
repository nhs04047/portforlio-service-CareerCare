import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import CertificateEditForm from './CertificateEditForm';
import CertificateDel from './CertificateDel';

/**작성자 - 이예슬
 **기능 - certificate Card를 만들어준다
 * Card의 형태를 나타내줌
 */
function CertificateCard({ isEditable, certificate, setCertificate }) {
  const { title, description, when_date, isPrivate } = certificate;
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
            {isPrivate && (
              <Col>
                <span>{title}</span>
                <br />
                <span className='text-muted'>{description}</span>
                <br />
                <span className='text-muted'>{when_date}</span>
              </Col>
            )}

            {isEditable && isPrivate && (
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
                <div className='mb-2' />
                <CertificateDel
                  certificate={certificate}
                  setCertificate={setCertificate}
                />
              </Col>
            )}
          </Row>
        </Card.Text>
      )}
    </>
  );
}

export default CertificateCard;
