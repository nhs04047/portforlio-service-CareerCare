import React, { useState } from 'react';
import { Button, Form, Card, Col, Row, Stack } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';
/**
 * isAdding이 true일 경우 활성화되는 component
 */
function ProjectAddForm({ portfolioOwnerId, setIsAdding, setProject }) {
  /**
   * test위해 initial state를 임의로 작성해놓음
   * backend와 연결 후 정상작동 시 주석 코드로 대체 예정
   */
  // useState로 title, description, from_date, to_date 생성
  //   const [title, setTitle] = useState(project.title);
  //   const [description, setDescription] = useState(project.description);
  //   const [from_date, setFrom_date] = useState(project.from_date);
  //   const [to_date, setTo_date] = useState(project.to_date);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from_date, setFrom_date] = useState(new Date());
  const [to_date, setTo_date] = useState(new Date());

  //new Date()를 통해 얻어지는 값이 현재시간을 포함해서 날짜만 얻기 위해 작성한 함수
  function filterDate(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post 요청시 user_id가 필요해서 얻어옴
    const user_id = portfolioOwnerId;
    await Api.post('project/create', {
      user_id,
      title,
      description,
      from_date: filterDate(from_date),
      to_date: filterDate(to_date),
    });
    //프로젝트 정보는 res.data
    const res = await Api.get('projectlist', user_id);
    const updatedProject = res.data;
    //해당 프로젝트 정보로 project 세팅함
    setProject(updatedProject);
    //isEditing을 false로 세팅함
    setIsAdding(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='projectAddTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='projectAddDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='projectAddDate'>
            <Stack direction='horizontal' gap={0}>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={from_date}
                onChange={(date) => {
                  setFrom_date(date);
                  console.log(date);
                }}
              />
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={to_date}
                minDate={from_date}
                onChange={(date) => setTo_date(date)}
              />
            </Stack>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsAdding(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProjectAddForm;

new Date().toDateString();
