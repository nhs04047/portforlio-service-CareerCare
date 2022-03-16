import { ProjectModel } from "../schemas/project";

class Project {
    static async create({ newProject }) {
        const createdNewProject = await ProjectModel.create(newProject);
        return createdNewProject;
      }
      static async findById({ project_id }) {
        const project = await ProjectModel.findOne({ id: project_id });
        return project;
      }
      static async findAll() {
        const projects = await ProjectModel.find({});
        return projects;
      }
}

export { Project };
