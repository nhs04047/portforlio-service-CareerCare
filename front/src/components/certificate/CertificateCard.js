import { Card, Button, Col, Row } from 'react-bootstrap';
import CertificateList from './CertificateList';

function CertificateCard({ certificate, setIsEditing, isEditable }) {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Card.Text>
          <CertificateList certificate={certificate} />
        </Card.Text>
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

export default CertificateCard;
