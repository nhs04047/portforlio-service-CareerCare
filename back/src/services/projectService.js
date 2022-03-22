import {Project} from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import {v4 as uuidv4} from "uuid";

class projectService {

  /*
   * addProject
   *
   */
  static async addProject({user_id, title, description, from_date, to_date}) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newProject = {user_id, id, title, description, from_date, to_date};

    // db에 저장
    const createdNewProject = await Project.create({newProject});
    createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewProject;
  }

  /*
   * getProject
   *
   */
  static async getProject({projectId}) {
    const project = await Project.findById({projectId});
    return project;
  }

  /*
   * setProject
   *
   */
  static async setProject({projectId, toUpdate}) {
    let project = await Project.findById({projectId});
    console.log(project);

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({projectId, fieldToUpdate, newValue});
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({projectId, fieldToUpdate, newValue});
    }

    if (toUpdate.from_date) {
      const fieldToUpdate = "from_date";
      const newValue = toUpdate.from_date;
      project = await Project.update({projectId, fieldToUpdate, newValue});
    }

    if (toUpdate.to_date) {
      const fieldToUpdate = "to_date";
      const newValue = toUpdate.to_date;
      project = await Project.update({projectId, fieldToUpdate, newValue});
    }

    return project;
  }

  /*
   * getProjectList
   *
   */
  static async getProjectList({user_id}) {
    console.log("서비스 유저아이디", user_id);
    const projectList = await Project.findByUserId({user_id});
    return projectList;
  }
}

export {projectService};
