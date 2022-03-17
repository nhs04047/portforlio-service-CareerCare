import React, { useEffect, useState } from 'react';
import { Card, Button, Col, Row } from 'react-bootstrap';

import ProjectAddForm from './ProjectAddForm';
import ProjectList from './ProjectList';
import * as Api from '../../api';

const initProjectList = [
  {
    title: '제목예시1',
    description: '내용 예시1',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
  {
    title: '제목예시2',
    description: '내용 예시2',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
  {
    title: '제목예시3',
    description: '내용 예시3',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
];

function Project({ portfolioOwnerId, isEditable }) {
  const [isAdding, setIsAdding] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 project 상태를 생성함
  const [project, setProject] = useState(initProjectList);

  useEffect(() => {
    // "projects/유저id" 엔드포인트로 GET 요청을 하고, project를 response의 data로 세팅함.
    Api.get('projects', portfolioOwnerId).then((res) => setProject(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <Card.Title>프로젝트</Card.Title>
          <Card.Text>
            <ProjectList
              project={project}
              isEditable={isEditable}
              setProject={setProject}
            />
          </Card.Text>
          {isEditable && (
            <Col>
              <Row className='mt-3 text-center text-info my-3'>
                <Col sm={{ span: 20 }}>
                  <Button
                    variant='primary'
                    size='md'
                    onClick={() => setIsAdding(true)}
                  >
                    +
                  </Button>
                </Col>
              </Row>
            </Col>
          )}
          {isAdding ? (
            <ProjectAddForm
              portfolioOwnerId={portfolioOwnerId}
              setIsAdding={setIsAdding}
              setProject={setProject}
            />
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default Project;
