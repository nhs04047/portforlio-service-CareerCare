import { Card, Button, Col, Row } from 'react-bootstrap';
import ProjectCard from './ProjectCard';

function ProjectList({ project, isEditable, setIsAdding, setProject }) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Card.Text>
          <ProjectCard
            project={project}
            isEditable={isEditable}
            setProject={setProject}
          />
        </Card.Text>
        {isEditable && (
          <Col>
            <Row className='mt-3 text-center text-info'>
              <Col sm={{ span: 20 }}>
                <Button
                  variant='primary'
                  size='md'
                  onClick={() => setIsAdding(true)}
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

export default ProjectList;
