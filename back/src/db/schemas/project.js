/*
* <Project MVP 기능 Schema 정의>
* 작성자 : 장정민
* 장성일 : 2022.03.16
*/

import {Schema, model} from "mongoose";


const ProjectSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    id: {
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
    // 프로젝트 링크를 위한 스키마
    projectLink: {
      type: String,
    },
    from_date: {
      type: String,
      required: true,
    },
    to_date: {
      type: String,
      required: true,
    },
    //isPrivate : true면 해당 도큐먼트 비공개 설정
    isPrivate: {
      type: Boolean,
      default : false,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export {ProjectModel};
