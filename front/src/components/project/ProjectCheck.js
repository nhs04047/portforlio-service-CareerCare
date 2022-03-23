import React from 'react';

import { Form } from 'react-bootstrap';

function ProjectCheck({ ischecked, setIsChecked }) {
  // const [ischecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!ischecked);
    console.log(ischecked);
  };
  return (
    <>
      <Form.Check
        type='switch'
        id='custom-switch'
        label='비공개'
        onChange={handleChange}
        checked={ischecked}
      />
    </>
  );
}

export default ProjectCheck;
