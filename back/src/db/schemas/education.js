/*
* <Education MVP 기능 Schema 정의>
* 작성자 : 김보현
* 장성일 : 2022.03.16
*/
import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    position: {
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

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
