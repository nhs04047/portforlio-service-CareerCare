import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';
import ProjectDel from './ProjectDel';

function ProjectCard({ project, isEditable, setProject }) {
  const { title, description, projectLink, from_date, to_date, isPrivate } =
    project;

  // isPrivate가 true이고 isEditable이 true이면 card가 보이고
  // isPrivate가 true이고 isEditable이 false이면 card가 안보여야함!

  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          setProject={setProject}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Card.Text>
          <Row className='align-items-center'>
            {isPrivate && (
              <Col>
                <span>{title}</span>
                <br />
                <span className='text-muted'>{description}</span>
                <br />
                <span className='text-muted'>링크: </span>
                <a href={projectLink} target='__blank'>
                  {projectLink}
                </a>
                <br />
                <span className='text-muted'>
                  {from_date} ~ {to_date}
                </span>
              </Col>
            )}

            {isEditable && isPrivate && (
              <Col xs lg='1'>
                <Button
                  variant='outline-info'
                  size='sm'
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  편집
                </Button>
                <div className='mb-2' />
                <ProjectDel project={project} setProject={setProject} />
              </Col>
            )}
          </Row>
        </Card.Text>
      )}
    </>
  );
}

export default ProjectCard;
