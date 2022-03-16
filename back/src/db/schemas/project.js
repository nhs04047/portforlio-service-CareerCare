import { Schema, model } from "mongoose";
const { Types: { ObjectId } } = Schema;

const ProjectSchema = new Schema(
  {
    id:{
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "프로젝트 제목",
    },
    description: {
      type: String,
      required: true,
      default: "상세내역",
    },
    from_date: {
      type: Date,
      required: true,
    },
    to_date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
