import React, { useEffect, useState } from 'react';
import ProjectEditForm from './ProjectEditForm';
import ProjectCard from './ProjectCard';
import * as Api from '../../api';

function Project({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  // const [user, setUser] = useState(null);
  // useState 훅을 통해 project 상태를 생성함
  const [project, setProject] = useState(null);

  useEffect(() => {
    // "projects/유저id" 엔드포인트로 GET 요청을 하고, project를 response의 data로 세팅함.
    Api.get('projects', portfolioOwnerId).then((res) => setProject(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          // user={user}
          project={project}
          setIsEditing={setIsEditing}
          // setUser={setUser}
          setProject={setProject}
        />
      ) : (
        <ProjectCard
          // user={user}
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
