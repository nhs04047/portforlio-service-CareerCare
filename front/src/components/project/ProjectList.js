import { Col, Container } from 'react-bootstrap';
import React from 'react';
import ProjectCard from './ProjectCard';
// Project를 받아서 map 함수를 이용해 ProjectCard로 넘겨주는 component
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
