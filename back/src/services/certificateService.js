/*
  certificateRouter에서 넘어온 정보들로 특정 로직을 구성하여 Certificate에서 처리 후 certificateRouter에서 return
  천준석
  2022/03/17

 * <certificate 비공개 설정 구현>
 * 작성자 : 장정민, 일자 : 2022-03-23
 * - addCertificate 함수 : certificate 컬렉션 db에 isPrivate필드 추가로 저장 
 * - getCertificateList 함수 : 읽기 권한을 구분하기 위해 현재 로그인한 currentUserId와 params에서 받아오는 user_id의 데이터 반환함수를 분리함.
 * 
 */

import { Certificate } from '../db';
import { v4 as uuid4 } from 'uuid';

class CertificateService {
  // 자격증을 추가하기 위하여 고유한 id값을 생성하고, 함께 db에 정보를 넘겨준다.
  static async addCertificate({ user_id, title, description, when_date, isPrivate  }) {
    // uuid를 사용하여 고유 id 생성한다.
    const id = uuid4();

    const newCertificate = { id, user_id, title, description, when_date, isPrivate  };

    const createdNewCertificate = await Certificate.create({ newCertificate });

    return createdNewCertificate;
  }
  // 자격증 id에 해당하는 자격증이 db에 있다면 정보를 넘겨준다. 없다면 에러처리
  static async getCertificate({ certificateId }) {
    const certificate = await Certificate.findOneById({ certificateId });
    if (!certificate) {
      const message = '해당 id를 가진 자격증 데이터가 없습니다.';
      return { message };
    }
    return certificate;
  }

  static async setCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findOneById({ certificateId });
    if (!certificate) {
      const message = '해당 id를 가진 자격증 데이터가 없습니다.';
      return { message };
    }

    const myKeys = Object.keys(toUpdate);
    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]]!==null) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        certificate = await Certificate.update({
          certificateId,
          fieldToUpdate,
          newValue,
        });
      }
    }

    return certificate;
  }


  /*
   * getCertificateList
   *
   */
  static async getCertificateList({ currentUserId, user_id }) {
    //currentUserId와 user_id가 동일하면 => isPrivate 필터링 없이 모든 데이터 반환
    if (currentUserId==user_id) {
      return Certificate.findManyByUserId({ user_id });
    }
    //currentUserId와 user_id가 동일하지 않으면 => isPrivate 필터링 처리한 데이터 반환
    else {
      return Certificate.findManyByAnotherUserId({ user_id });
    }
    
  }

  // certificateId 알맞는 certificate 데이터를 삭제하고 성공 메시지를 반환하는데, 알맞는 ID가 없을 시 에러메시지 반환
  static async deleteCertificate({ certificateId }) {
    const isDataDeleted = await Certificate.deleteOneById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage = '해당 id를 가진 수상 데이터는 없습니다.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { CertificateService };
