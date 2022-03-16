import { Card, Col, Container } from 'react-bootstrap';

function CertificateList({ certificate }) {
  return (
    <Container fluid>
      <Col>
        {certificate.map((certificate) => {
          return (
            <Card>
              <Card.Body>
                <Card.Title>{certificate.title}</Card.Title>
                <Card.Subtitle>{certificate.description}</Card.Subtitle>
                <Card.Text>{certificate.whenDate}</Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </Col>
    </Container>
  );
}

export default CertificateList;
