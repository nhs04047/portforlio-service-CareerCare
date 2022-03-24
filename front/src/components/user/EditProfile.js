import React, { useState, useEffect } from 'react';
import { Card, Row, Button, Col, Form } from 'react-bootstrap';

import * as Api from '../../api';

function EditProfile({ user, setIsEditProfile, profileUrl, setProfileUrl }) {
  const [files, setFiles] = useState('');

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
    console.log(`files: ${files}`);
  };

  const handleClick = async (e) => {
    const formData = new FormData();
    formData.append('img', files[0]);
    console.log(`formData: ${formData}`);
    for (const keyValue of formData) console.log(`formData: ${keyValue}`);

    const res = await Api.put(`users/profileImg/${user.id}`, formData);
    const updateProfile = res.data.location;
    setProfileUrl(updateProfile);
  };

  return (
    <Card className='mb-2 ms-3'>
      <Card.Body>
        <form>
          <label htmlFor='img'></label>
          <input type='file' id='img' accept='img/*' onChange={onLoadFile} />
        </form>
        <Form.Group as={Row} className='mt-3 text-center'>
          <Col sm={{ span: 20 }}>
            <Button
              variant='primary'
              type='button'
              className='me-3'
              size='sm'
              onClick={handleClick}
            >
              확인
            </Button>
            <Button
              variant='secondary'
              size='sm'
              onClick={() => setIsEditProfile(false)}
            >
              취소
            </Button>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default EditProfile;
