import React, { useEffect, useState } from 'react';
import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';
import * as Api from '../../api';

function Certificate({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    // "projects/유저id" 엔드포인트로 GET 요청을 하고, project를 response의 data로 세팅함.
    Api.get('certificates', portfolioOwnerId).then((res) =>
      setCertificate(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          certificate={certificate}
          setIsEditing={setIsEditing}
          setCertificate={setCertificate}
        />
      ) : (
        <CertificateCard
          certificate={certificate}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Certificate;
