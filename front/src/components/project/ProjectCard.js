import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';
import ProjectDel from './ProjectDel';

function ProjectCard({ project, isEditable, setProject, portfolioOwnerId }) {
  const { title, description, from_date, to_date } = project;
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
            <Col>
              <span>{title}</span>
              <br />
              <span className='text-muted'>{description}</span>
              <br />
              <span className='text-muted'>
                {from_date} ~ {to_date}
              </span>
            </Col>
            {isEditable && (
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
