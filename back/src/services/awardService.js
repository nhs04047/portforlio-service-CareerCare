/*
  awardRouter에서 넘어온 정보들로 특정 로직을 구성하여 Award.js에서 처리 후 awardRouter로 return
  천준석
  2022/03/16
*/

import { Award } from '../db';
import { v4 as uuidv4 } from 'uuid'; // 중복되지 않는 아이디 값 사용을 위해 import

class AwardService {
  // user_id, title, description를 받아서 새로운 award 데이터 생성
  static async addAward({ user_id, title, description }) {
    // 유니크한 id값 생성
    const id = uuidv4();

    const newAward = { id, user_id, title, description };
    // 새로운 Award 데이터 db에 저장
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  // awardId를 통해서 Award 데이터 반환
  static async getAward({ awardId }) {
    // findOneById를 통해 해당 awardId와 같은 Id를 찾아서 데이터 반환
    const award = await Award.findOneById({ awardId });
    if (!award) {
      const errorMessage = '해당 id를 가진 수상 데이터가 없습니다';
      return { errorMessage };
    }
    return award;
  }

  // awardId와 갱신할 toUpdate를 받아 db에 저장히기 위한 로직 생성하여 갱신된 내용 반환한다.
  static async setAward({ awardId, toUpdate }) {
    // 해당 awardId가 db에 있는 확인하기 위한 변수 선언(award를 변경하기 위하여 const가 아닌 let으로 선언)
    let award = await Award.findOneById({ awardId });

    // award가 존재하지 않다면 error message 출력한다.
    if (!award) {
      const errorMessage = '해당 id를 가진 수상 데이터가 없습니다';
      return { errorMessage };
    }

    // Object.keys를 사용해 field의 수가 얼마가 되는 반복문을 이용해 간결하게 update를 진행한다.
    const myKeys = Object.keys(toUpdate);
    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]]) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        award = await Award.update({ awardId, fieldToUpdate, newValue });
      }
    }

    return award;
  }

  // user_id를 db의 findManyByUserId와 같은 데이터의 award들을 조회한다.
  static async getAwardList({ user_id }) {
    const awards = await Award.findManyByUserId({ user_id });

    return awards;
  }

  // awardId와 알맞는 award 데이터를 삭제하고 성공 메시지를 반환하는데, 알맞는 ID가 없을 시 에러메시지 반환
  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteOneById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage = '해당 id를 가진 데이터는 없습니다.';
      return { errorMessage };
    }

    return { status: 'ok' };
  }
}

export { AwardService };
