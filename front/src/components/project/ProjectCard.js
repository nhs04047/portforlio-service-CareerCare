import { Card, Button } from 'react-bootstrap';

function ProjectCard({ project, setIsEditing, isEditable }) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Card.Text></Card.Text>
        <div className='text-center'>
          <Button variant='primary'>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
