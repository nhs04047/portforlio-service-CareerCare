import React, { useState } from 'react';
import { Card, Row, Button, Col, Form } from 'react-bootstrap';

import axios from 'axios';
import * as Api from '../../api';

function EditProfile({ user, setUser, setIsEditProfile, portfolioOwnerId }) {
  const [files, setFiles] = useState(user.profileImgPath);

  const backendPortNumber = '5001';
  const serverUrl =
    window.location.protocol +
    '//' +
    window.location.hostname +
    ':' +
    backendPortNumber +
    '/';

  async function put(endpoint, data) {
    console.log(`%cPUT 요청: ${serverUrl + endpoint}`, 'color: #059c4b;');
    console.log(`%cPUT 요청 데이터: ${data}`, 'color: #059c4b;');

    return axios.put(serverUrl + endpoint, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('userToken')}`,
      },
    });
  }

  const onLoadFile = (e) => {
    const file = e.target.files;
    setFiles(file);
    console.log(`files: ${files}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('img', files[0]);

    await put(`users/profileImg/${user.id}`, formData);

    const res = await Api.get('users/profileImg', user.id);

    const updateProfile = res.data;
    setFiles(updateProfile);

    Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));

    setIsEditProfile(false);
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
              type='submit'
              className='me-3'
              size='sm'
              onClick={handleSubmit}
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
