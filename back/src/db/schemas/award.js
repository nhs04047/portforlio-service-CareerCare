/*
  summary : Award MVP 기능에서 필요한 속성들에 대한 Schema 정의
  author : 천준석
  date : 2022/03/15
*/

import { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    // 수상내역
    title: {
      type: String,
      required: true,
    },
    // 상세내역
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
