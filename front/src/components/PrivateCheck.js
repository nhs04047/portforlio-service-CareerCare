import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

/**
 * 비공개 기능 구현하는 component
 * isPrivate가 true일 때 비공개
 */

function PrivateCheck({ isPrivate, setIsPrivate }) {
  const [ischecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!ischecked);
    if (ischecked === false) {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
    console.log(ischecked);
  };
  return (
    <>
      <Form.Check
        type='switch'
        id='custom-switch'
        label='비공개'
        onChange={handleChange}
        checked={isPrivate}
      />
    </>
  );
}

export default PrivateCheck;
