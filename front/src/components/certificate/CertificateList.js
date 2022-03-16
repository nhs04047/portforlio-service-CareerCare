import { Col, Container } from 'react-bootstrap';
import React from 'react';
import CertificateCard from './CertificateCard';

function CertificateList({ certificate, isEditable, setCertificate }) {
  return (
    <Container fluid>
      <Col>
        {certificate.map((v) => (
          <CertificateCard
            certificate={v}
            isEditable={isEditable}
            setProject={setCertificate}
          />
        ))}
      </Col>
    </Container>
  );
}

export default CertificateList;
