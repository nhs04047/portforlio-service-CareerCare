import React, { useState } from 'react';
import { Card, Button, Stack } from 'react-bootstrap';

import ProjectEditForm from './ProjectEditForm';
import ProjectDel from './ProjectDel';

function ProjectCard({ project, isEditable, setProject }) {
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
        <Card className='my-1'>
          <Card.Body>
            <Stack direction='horizontal'>
              <div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{description}</Card.Subtitle>
                <Card.Text>
                  {from_date} ~ {to_date}
                </Card.Text>
              </div>
              <div className='ms-auto px-3'>
                {isEditable && (
                  <div>
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
                  </div>
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
