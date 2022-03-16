import React, { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';

function ProjectCard({ project, isEditable, setProject }) {
  const { title, description, fromDate, toDate } = project;
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
        <Card className='my-1'>
          <Card.Body>
            <Stack direction='horizontal'>
              <div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{description}</Card.Subtitle>
                <Card.Text>
                  {fromDate} ~ {toDate}
                </Card.Text>
              </div>
              <div className='ms-auto px-3'>
                {isEditable && (
                  <Button
                    variant='outline-info'
                    size='sm'
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    편집
                  </Button>
                )}
              </div>
            </Stack>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default ProjectCard;
