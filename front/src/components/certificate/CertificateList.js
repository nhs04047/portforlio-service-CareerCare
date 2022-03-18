import { Col, Container } from 'react-bootstrap';
import React from 'react';
import CertificateCard from './CertificateCard';

/**작성자 - 이예슬
 **기능 - certificate list를 만들어준다
 * certificate 컴포넌트로부터 props를 받아 .map을 통해 list를 만듦
 */
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
            setCertificate={setCertificate}
            portfolioOwnerId={portfolioOwnerId}
          />
        ))}
      </Col>
    </Container>
  );
}

export default CertificateList;
