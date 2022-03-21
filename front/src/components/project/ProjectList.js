import React from 'react';
import ProjectCard from './ProjectCard';
// Project를 받아서 map 함수를 이용해 ProjectCard로 넘겨주는 component
function ProjectList({ project, isEditable, setProject, portfolioOwnerId }) {
  return (
    <div>
      {project.map((v, index) => (
        <ProjectCard
          key={index}
          project={v}
          isEditable={isEditable}
          setProject={setProject}
          portfolioOwnerId={portfolioOwnerId}
        />
      ))}
    </div>
  );
}

export default ProjectList;
