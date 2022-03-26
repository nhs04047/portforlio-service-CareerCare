/*
* 좋아요 기능 모델
*
* <like 스키마 데이터 조작 모델 구현>
* 작성자 : 최준석
* 작성일 : 2022.03.25
* 두 유저가 좋아요 관계인지 아닌지 알기 위한 함수
*/

import { LikeModel } from "../schemas/like";

class Like {
  /*
  * create()
  * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user로 like 객체 생성
  */
  static async create({ currentUser, otherUser }) {
    const createdNewLike = await LikeModel.create({
      currentUser,
      otherUser,
    });
    return createdNewLike;
  }

  /*
  * findByUser()
  * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체가 LikeModel안에 있다면 like 객체 반환/ 아니면 null 반환
  */
  static async findByUser({ currentUser, otherUser }) {
    const like = await LikeModel.findOne({
      $and: [{ currentUser }, { otherUser }],
    });
    return like;
  }

  /*
  * deleteById
  * 좋아요 버튼을 클릭한 user와 좋아요를 받은 user의 like 객체 삭제
  */
  static async deleteById({ isLiked }) {
    const deleteResult = await LikeModel.deleteOne({
      _id : isLiked._id,
    });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Like };

