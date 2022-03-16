import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';

function ProjectCard({ key, project, isEditable, setProject }) {
  const { title, description, fromDate, toDate } = project;
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
        <Card>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>{description}</Card.Subtitle>
            <Card.Text>
              {fromDate} ~ {toDate}
            </Card.Text>
            {isEditable && (
              <Button
                variant='outline-info'
                size='sm'
                onClick={() => {
                  setIsEditing(true);
                  console.log(project);
                  console.log(project[1].title);
                  console.log(key);
                }}
              >
                편집
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ProjectCard;
