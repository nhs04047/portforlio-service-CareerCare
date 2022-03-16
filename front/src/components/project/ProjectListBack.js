import { useEffect, useState } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import * as Api from '../../api';

function ProjectListBack() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    Api.get('projects').then((res) => setProjects(res.data));
  }, [setProjects]);

  return (
    <Container fluid>
      <Col>
        {projects.map((project) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{project.title}</Card.Title>
                <Card.Subtitle>{project.description}</Card.Subtitle>
                <Card.Text>
                  {project.fromDate} ~ {project.toDate}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Col>
    </Container>
  );
}

export default ProjectListBack;
