import { Col, Container } from 'react-bootstrap';
import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ project, isEditable, setProject }) {
  return (
    <Container fluid>
      <Col>
        {project.map((v) => (
          <ProjectCard
            key={v.id}
            project={v}
            isEditable={isEditable}
            setProject={setProject}
          />
        ))}
      </Col>
    </Container>
  );
}

export default ProjectList;
