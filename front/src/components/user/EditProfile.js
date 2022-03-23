import React from 'react';
import { Form, Card } from 'react-bootstrap';

function EditProfile() {
  return (
    <Card className='mb-2 ms-3'>
      <Card.Body>
        <Form.Group controlId='formFile' className='mb-3'>
          <Form.Label>프로필 사진을 업로드해주세요</Form.Label>
          <Form.Control type='file' />
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default EditProfile;
