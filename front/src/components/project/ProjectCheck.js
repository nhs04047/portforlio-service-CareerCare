import React, { useState } from 'react';

import { Form } from 'react-bootstrap';

function ProjectCheck({ setIsPrivate }) {
  //isPrivate, setIsPrivate는 string
  // isChecked는 boolean값이여야 하고 둘이 연결되야 함
  //isPrivate가 false일 때 공개 true일 때 비공개

  const [ischecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!ischecked);
    if (ischecked === false) {
      setIsPrivate('false');
    } else {
      setIsPrivate('true');
    }
    console.log(ischecked);
  };
  return (
    <>
      <Form.Check
        type='switch'
        id='custom-switch'
        label='공개'
        onChange={handleChange}
        checked={ischecked}
      />
    </>
  );
}

export default ProjectCheck;
