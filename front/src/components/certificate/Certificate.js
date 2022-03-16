import React, { useEffect, useState } from 'react';
import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';
import * as Api from '../../api';

function Certificate({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(null);
  const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(null);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);
  Api.get('certificatelist', portfolioOwnerId).then((res) =>
    setCertificate(res.data)
  );

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          user={user}
          certificate={certificate}
          setIsEditing={setIsEditing}
          setUser={setUser}
          setCertificate={setCertificate}
        />
      ) : (
        <CertificateCard
          user={user}
          certificate={certificate}
          setCertificate={setCertificate}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Certificate;
