import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import * as Api from '../../api';
import PrivateCheck from '../PrivateCheck';

/**
 * isAdding이 true일 경우 활성화되는 component
 */
function ProjectAddForm({ portfolioOwnerId, setIsAdding, setProject }) {
  /**
   * test위해 initial state를 임의로 작성해놓음
   * backend와 연결 후 정상작동 시 주석 코드로 대체 예정
   */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [from_date, setFrom_date] = useState(new Date());
  const [to_date, setTo_date] = useState(new Date());
  const [isPrivate, setIsPrivate] = useState(false);

  //new Date()를 통해 얻어지는 값이 현재시간을 포함해서 날짜만 얻기 위해 작성한 함수
  function filterDate(d) {
    // return toLocaleString(d);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${(
      '0' + d.getDate()
    ).slice(-2)}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // post 요청시 user_id가 필요해서 얻어옴
    const user_id = portfolioOwnerId;
    if (title !== '') {
      await Api.post('project/create', {
        user_id,
        title,
        description,
        projectLink,
        from_date: filterDate(from_date),
        to_date: filterDate(to_date),
        isPrivate,
      });
      //프로젝트 정보는 res.data
      const res = await Api.get('projectlist', user_id);
      const updatedProject = res.data;
      //해당 프로젝트 정보로 project 세팅함
      setProject(updatedProject);
      //isEditing을 false로 세팅함
      setIsAdding(false);
    } else {
      console.log('%내용이 없습니다!');
    }
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
