import React, { useEffect, useState } from 'react';
import CertificateEditForm from './CertificateEditForm';
import CertificateCard from './CertificateCard';
import * as Api from '../../api';
const initCertificateList = [
  {
    title: '제목예시1',
    description: '내용 예시1',
    whenDate: '2022.03.15',
  },
  {
    title: '제목예시2',
    description: '내용 예시2',
    whenDate: '2022.03.15',
  },
  {
    title: '제목예시3',
    description: '내용 예시3',
    whenDate: '2022.03.15',
  },
];
function Certificate({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState(null);
  const [certificate, setCertificate] = useState(initCertificateList);

  useEffect(() => {
    // "projects/유저id" 엔드포인트로 GET 요청을 하고, project를 response의 data로 세팅함.
    Api.get('certificates', portfolioOwnerId).then((res) =>
      setCertificate(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <div>
          <CertificateCard
            certificate={certificate}
            setProject={setCertificate}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          />
          <CertificateEditForm
            certificate={certificate}
            setIsEditing={setIsEditing}
            setCertificate={setCertificate}
          />
        </div>
      ) : (
        <CertificateCard
          certificate={certificate}
          setProject={setCertificate}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Certificate;
