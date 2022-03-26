import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * 비공개 기능 구현하는 component
 * isPrivate가 true일 때 비공개
 */

function PrivateCheck({ isPrivate, setIsPrivate }) {
  return (
    <>
      <Form.Check
        type='switch'
        id='custom-switch'
        label='비공개'
        onChange={() => setIsPrivate((curr) => !curr)}
        checked={isPrivate}
      />
    </>
  );
}

export default PrivateCheck;
