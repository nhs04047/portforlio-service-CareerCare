import React, { useState } from 'react';
import { Card, Row, Button, Col, Form } from 'react-bootstrap';

import axios from 'axios';
import * as Api from '../../api';

function EditProfile({ user, setIsEditProfile, profileUrl, setProfileUrl }) {
  const [files, setFiles] = useState('');

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

  const handleClick = async (e) => {
    const formData = new FormData();
    formData.append('img', files[0]);
    // console.log(`files[0]: ${files[0]}`);
    // console.log(`formData: ${formData}`);
    // for (const keyValue of formData) console.log(`formData: ${keyValue}`);

    await put(`users/profileImg/${user.id}`, formData);

    const res = await Api.get('users/profileImg', user.id);
    console.log(res);

    const updateProfile = res.data;
    setProfileUrl(updateProfile);
    console.log(profileUrl);
    setIsEditProfile(false);
    console.log(user);
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
