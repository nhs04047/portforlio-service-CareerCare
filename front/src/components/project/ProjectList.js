import { Col, Container } from 'react-bootstrap';
import React from 'react';
import ProjectCard from './ProjectCard';

function ProjectList({ project, isEditable, setProject }) {
  return (
    <Container fluid>
      <Col>
        {project.map((v, index) => (
          <ProjectCard
            key={index}
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
