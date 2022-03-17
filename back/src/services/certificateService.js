/*
  certificateRouter에서 넘어온 정보들로 특정 로직을 구성하여 Certificate에서 처리 후 certificateRouter에서 return
  천준석
  2022/03/17
*/

import {Certificate} from "../db"
import { v4 as uuid4} from "uuid";

class CertificateService {
  static async addCertificate({user_id, title, description, when_date}) {
      const id = uuid4();

      const newCertificate = {id, user_id, title, description, when_date};

      const createdNewCertificate = await Certificate.create({newCertificate});

      return createdNewCertificate;
  }


}

export {CertificateService};