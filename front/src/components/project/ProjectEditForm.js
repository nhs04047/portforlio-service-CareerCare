import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function ProjectEditForm({ project, setIsEditing, setProject }) {
  // useState로 title, description, from_date, to_date 생성
  //   const [title, setTitle] = useState(project.title);
  //   const [description, setDescription] = useState(project.description);
  //   const [from_date, setFrom_date] = useState(project.from_date);
  //   const [to_date, setTo_date] = useState(project.to_date);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from_date, setFrom_date] = useState(new Date());
  const [to_date, setTo_date] = useState(new Date());

  //   const [startDate, setStartDate] = useState(new Date());
  function filterDate(d) {
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = project.user_id;
    await Api.put(`projects/${project.id}`, {
      user_id,
      title,
      description,
      from_date: filterDate(from_date),
      to_date: filterDate(to_date),
    });
    const res = await Api.get('projectlist', user_id);
    //프로젝트 정보는 res.data
    const updatedProject = res.data;
    //해당 프로젝트 정보로 project 세팅함
    setProject(updatedProject);
    //isEditing을 false로 세팅함
    setIsEditing(false);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='projectEditTitle' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='프로젝트 제목'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='projectEditDescription' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='projectEditDate'>
            <Col sm={{ span: 20 }}>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={from_date}
                onChange={(date) => setFrom_date(date)}
              />
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={to_date}
                onChange={(date) => setTo_date(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ProjectEditForm;
