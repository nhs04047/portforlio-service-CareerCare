/*
  CertificateService에서 매개변수로 넘어온 입력값에 맞게 DB(CertificateModel)에 새로운 데이터를 저장하거나, 찾거나, 갱신하거나, 삭제하여 CertificateService로 return
  천준석
  2022/03/17
*/

import { CertificateModel } from '../schemas/certificate';

class Certificate {
  // db 모델에 넘어온 정보들을 create 저장하고 그 내용을 return
  static async create({ newCertificate }) {
    return CertificateModel.create(newCertificate);
  }
  // db에 id가 certificateId에 해당하는 자격증 정보를 반환한다. 실패시 null 리턴
  static async findOneById({ certificateId }) {
    return CertificateModel.findOne({ id: certificateId });
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updateCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updateCertificate;
  }

  static async findManyByUserId({ user_id }) {
    return CertificateModel.find({ user_id });
  }
}

export { Certificate };
