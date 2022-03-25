import React from 'react';
import { Card } from 'react-bootstrap';

function ProfileImg({ profileUrl }) {
  return (
    <Card.Img
      style={{ width: '10rem', height: '8rem' }}
      className='mb-4'
      src={profileUrl}
      alt='프로필 사진을 등록해 주세요'
    />
  );
}
export default ProfileImg;
