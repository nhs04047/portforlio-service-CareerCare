import React, { useState } from 'react';
import { Card, Col, Container, Button } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';

function ProjectCard({ project, isEditable, setProject }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          setIsAdding={setIsEditing}
          setProject={setProject}
          setIsEditing={setIsEditing}
        />
      ) : (
        <Container fluid>
          <Col>
            {project.map((project) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>{project.title}</Card.Title>
                    <Card.Subtitle>{project.description}</Card.Subtitle>
                    <Card.Text>
                      {project.fromDate} ~ {project.toDate}
                    </Card.Text>
                    {isEditable && (
                      <Button
                        variant='outline-info'
                        size='sm'
                        onClick={() => setIsEditing(true)}
                      >
                        편집
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Container>
      )}
    </>
  );
}

export default ProjectCard;
