import { Card, Button } from 'react-bootstrap';

function CertificateCard({ project, setIsEditing, isEditable }) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Card.Text></Card.Text>
        <div className='text-center'>
          <Button variant='primary'>+</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CertificateCard;
