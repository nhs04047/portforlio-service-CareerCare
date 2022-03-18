import { Col, Container } from 'react-bootstrap';
import React from 'react';
import CertificateCard from './CertificateCard';

function CertificateList({
  certificate,
  isEditable,
  setCertificate,
  portfolioOwnerId,
}) {
  return (
    <Container fluid>
      <Col>
        {certificate.map((v, index) => (
          <CertificateCard
            key={index}
            certificate={v}
            isEditable={isEditable}
            setProject={setCertificate}
            portfolioOwnerId={portfolioOwnerId}
          />
        ))}
      </Col>
    </Container>
  );
}

export default CertificateList;
