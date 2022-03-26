import React, { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

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
        <Card className='my-1'>
          <Card.Body>
            <Stack direction='horizontal'>
              <div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{description}</Card.Subtitle>
                <Card.Text>{when_date}</Card.Text>
              </div>
              <div className='ms-auto px-3'>
                {isEditable && (
                  <Button
                    variant='outline-info'
                    size='sm'
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    편집
                  </Button>
                )}
              </div>
            </Stack>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default CertificateCard;
