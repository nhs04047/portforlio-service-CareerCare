import { Card, Col, Container } from 'react-bootstrap';

function ProjectList({ project }) {
  return (
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
              </Card.Body>
            </Card>
          );
        })}
      </Col>
    </Container>
  );
}

export default ProjectList;
