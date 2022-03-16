import { Card, Button, Col, Row } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable }) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Card.Text></Card.Text>
        {isEditable && (
          <Col>
            <Row className='mt-3 text-center text-info'>
              <Col sm={{ span: 20 }}>
                <Button
                  variant='primary'
                  size='md'
                  onClick={() => setIsEditing(true)}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
