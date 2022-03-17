import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';

function ProjectAddForm({ project, setIsAdding, setProject }) {
  // useState로 title, description, fromDate, toDate 생성
  //   const [title, setTitle] = useState(project.title);
  //   const [description, setDescription] = useState(project.description);
  //   const [fromDate, setFromDate] = useState(project.from_date);
  //   const [toDate, setToDate] = useState(project.to_date);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Api.post('project/create', {
      title,
      description,
      fromDate,
      toDate,
    });
    //프로젝트 정보는 res.data
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
            <Col sm={{ span: 20 }}>
              <DatePicker
                style={{ width: '5rem' }}
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
              />
              <DatePicker
                style={{ width: '5rem' }}
                selected={toDate}
                onChange={(date) => setToDate(date)}
              />
            </Col>
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
