import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class projectService {
  /*
   * addProject
   *
   */
  static async addProject({ user_id, title, description, projectLink, from_date, to_date }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { user_id, id, title, description, projectLink, from_date, to_date };

    // db에 저장
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  /*
   * getProject
   *
   */
  static async getProject({ projectId }) {
    const project = await Project.findOneById({ projectId });
    return project;
  }

  /*
   * setProject
   *
   */
  static async setProject({ projectId, toUpdate }) {
    let project = await Project.findOneById({ projectId });

    if (!project) {
      const errorMessage = '해당 id의 프로젝트는 없습니다.';
      return { errorMessage };
    }

    const myKeys = Object.keys(toUpdate);
    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]]) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        project = await Project.update({ projectId, fieldToUpdate, newValue });
      }
    }

    return project;
  }

  /*
   * getProjectList
   *
   */
  static async getProjectList({ user_id }) {
    const projectList = await Project.findManyByUserId({ user_id });
    return projectList;
  }

  /*
   * deleteProject
   *
   */
  static async deleteProject({ projectId }) {
    const isDataDeleted = await Project.deleteOneById({ projectId });

    if (!isDataDeleted) {
      const errorMessage = '해당 id를 가진 데이터는 없습니다.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { projectService };
