import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';
import PrivateCheck from '../private/PrivateCheck';

function ProjectEditForm({ project, setIsEditing, setProject }) {
  // useState로 title, description, from_date, to_date, isPrivate 생성
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [projectLink, setProjectLink] = useState(project.projectLink);
  const [from_date, setFrom_date] = useState(new Date(project.from_date));
  const [to_date, setTo_date] = useState(new Date(project.to_date));
  const [isPrivate, setIsPrivate] = useState(project.isPrivate);

  // yyyy-mm-dd로 날짜 형식을 변환해주는 함수
  function filterDate(d) {
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = project.user_id;
    await Api.put(`projects/${project.id}`, {
      user_id,
      title,
      description,
      projectLink,
      from_date: filterDate(from_date),
      to_date: filterDate(to_date),
      isPrivate,
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

          <Form.Group className='mb-3'>
            <Form.Control
              type='text'
              placeholder='프로젝트 링크'
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} controlId='projectAddDate'>
            <Col>
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={from_date}
                onChange={(date) => {
                  setFrom_date(date);
                }}
              />
              <DatePicker
                dateFormat='yyyy/MM/dd'
                selected={to_date}
                minDate={from_date}
                onChange={(date) => setTo_date(date)}
              />
            </Col>
          </Form.Group>
          <PrivateCheck
            className='ms-auto'
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
          />

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
