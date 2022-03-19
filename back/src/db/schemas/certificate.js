/*
  summary : Certificate MVP 기능에서 필요한 속성들에 대한 Schema 정의
  author : 천준석
  date : 2022/03/17
*/

import {model, Schema} from "mongoose";

const CertificateSchema = new Schema(
  {
    // 자격증 id
    id: {
      type:String, 
      required:true
    },
    // 사용자 id
    user_id: {
      type:String, 
      required:true
    },
    // 자격증 명
    title: {
      type:String,
      required:true
    },
    // 자격증에 대한 설명
    description: {
      type:String, 
      required:true
    },
    // 언제 취득했는지
    when_date: {
      type:String,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export {CertificateModel};