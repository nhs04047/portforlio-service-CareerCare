/*
* <Certificate MVP 기능 Schema 정의>
* 작성자 : 천준석
* 장성일 : 2022.03.17
*/

import {model, Schema} from "mongoose";

const CertificateSchema = new Schema(
  {
    id: {
      type:String, 
      required:true
    },
    user_id: {
      type:String, 
      required:true
    },
    title: {
      type:String,
      required:true
    },
    description: {
      type:String, 
      required:true
    },
    // 언제 취득했는지
    when_date: {
      type:String,
      required:true
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

const CertificateModel = model("Certificate", CertificateSchema);

export {CertificateModel};