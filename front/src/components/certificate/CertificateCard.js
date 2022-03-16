import React, { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

import CertificateEditForm from './CertificateEditForm';

function CertificateCard({ certificate, isEditable, setCertificate }) {
  const { title, description, whenDate } = certificate;
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
                <Card.Text>{whenDate}</Card.Text>
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
