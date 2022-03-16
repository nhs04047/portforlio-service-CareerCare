import { Project } from "../db/models/Project"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class projectService {

    static async addProject({title,description,from_date,to_date}) {
        // id 는 유니크 값 부여
        const id = uuidv4();
        const newProject = {id, title, description, from_date, to_date };
    
        // db에 저장
        const createdNewProject = await Project.create({ newProject });
        createdNewProject.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.
    
        return createdNewProject;
      }

    static async getProject({project_id}){
        const project = await Project.findById({ project_id });
        return project;
    }

    static async getProjects() {
        const projects = await Project.findAll();
        return projects;
      }

    static async modifyProject(){

    }

    static async deleteProject(){

    }
}


export { projectService };