import React, { useEffect, useState } from 'react';
import ProjectEditForm from './ProjectEditForm';
import ProjectCard from './ProjectCard';
import * as Api from '../../api';

const initProjectList = [
  {
    title: '제목예시1',
    description: '내용 예시1',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
  {
    title: '제목예시2',
    description: '내용 예시2',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
  {
    title: '제목예시3',
    description: '내용 예시3',
    fromDate: '2022.03.15',
    toDate: '2022.03.16',
  },
];

function Project({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState(null);
  // useState 훅을 통해 project 상태를 생성함
  const [project, setProject] = useState(initProjectList);

  useEffect(() => {
    // "projects/유저id" 엔드포인트로 GET 요청을 하고, project를 response의 data로 세팅함.
    Api.get('projects', portfolioOwnerId).then((res) => setProject(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          project={project}
          setIsEditing={setIsEditing}
          setProject={setProject}
        />
      ) : (
        <ProjectCard
          project={project}
          setProject={setProject}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />
      )}
    </>
  );
}

export default Project;
