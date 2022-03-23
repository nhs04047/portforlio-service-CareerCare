/**
 * <project 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * - addProject 함수 : project 컬렉션 db에 isPrivate필드 추가로 저장 
 * - getProjectList 함수 : 읽기 권한을 구분하기 위해 현재 로그인한 currentUserId와 params에서 받아오는 user_id의 데이터 반환함수를 분리함.
 * 
 */

import { Project } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from 'uuid';

class projectService {
  /*
   * addProject
   *
   */
  static async addProject({ user_id, title, description, projectLink, from_date, to_date, isPrivate }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = { user_id, id, title, description, projectLink, from_date, to_date, isPrivate };

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
      if (toUpdate[myKeys[i]]!==null) {
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
  static async getProjectList({ currentUserId, user_id }) {

    //currentUserId와 user_id가 동일하면 => isPrivate 필터링 없이 모든 데이터 반환
    if (currentUserId==user_id) {
      return Project.findManyByUserId({ user_id });
    }
    //currentUserId와 user_id가 동일하지 않으면 => isPrivate 필터링 처리한 데이터 반환
    else {
      return Project.findManyByAnotherUserId({ user_id });
    }
    
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
