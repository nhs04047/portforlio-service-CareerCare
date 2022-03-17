/*
  certificateRouter에서 넘어온 정보들로 특정 로직을 구성하여 Certificate에서 처리 후 certificateRouter에서 return
  천준석
  2022/03/17
*/

import {Certificate} from "../db"
import { v4 as uuid4} from "uuid";

class CertificateService {
  // 자격증을 추가하기 위하여 고유한 id값을 생성하고, 함께 db에 정보를 넘겨준다.
  static async addCertificate({user_id, title, description, when_date}) {
      // uuid를 사용하여 고유 id 생성한다.
      const id = uuid4();

      const newCertificate = {id, user_id, title, description, when_date};

      const createdNewCertificate = await Certificate.create({newCertificate});

      return createdNewCertificate;
  }
  // 자격증 id에 해당하는 자격증이 db에 있다면 정보를 넘겨준다. 없다면 에러처리
  static async getCertificate({certificateId}) {
    const certificate = await Certificate.findById({certificateId});
    if (!certificate) {
      const message = "해당 id를 가진 자격증 데이터가 없습니다.";
      return {message};
    }
    return certificate;
  }

  static async setCertificate({certificateId, toUpdate}) {
    let certificate = await Certificate.findById({certificateId});
    if (!certificate) {
      const message = "해당 id를 가진 자격증 데이터가 없습니다.";
      return {message};
    }
    if(toUpdate.title){
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({certificateId, fieldToUpdate, newValue});
    }
    if(toUpdate.description){
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({certificateId, fieldToUpdate, newValue});
    }
    if(toUpdate.when_date){
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({certificateId, fieldToUpdate, newValue});
    }

    return certificate;
  }

}

export {CertificateService};