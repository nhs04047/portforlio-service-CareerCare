import { UserModel } from "../schemas/user";
import { AwardModel } from '../schemas/award';
import { CertificateModel } from '../schemas/certificate';
import { EducationModel } from '../schemas/education';
import { ProjectModel } from '../schemas/project';

class User {
  /*
  create()
  user data 생성
  */
  static create({ newUser }) {
    return UserModel.create(newUser);

  }

  /*
  findByEmail()
  user email로 user정보 찾기
  */
  static findByEmail({ email }) {
    return UserModel.findOne({ email });
  }

  /*
  findById()
  user id로 user정보 찾기
  */
  static findById({ user_id }) {
    return UserModel.findOne({ id: user_id });
  }

  /*
  findManyByName()
  user 이름름으로 user정보 찾기 - 정렬{ asc, desc, likes, updatedAt}
  */
  static async findManyByName({ user_name, sortingOption }) {
    let users = [];

    switch (sortingOption) {
      case "asc":
        users = await UserModel.find({ name: new RegExp(user_name) }).sort({ name: 1 });     // 이름 순 오름차순
        break;
      case "desc":
        users = await UserModel.find({ name: new RegExp(user_name) }).sort({ name: -1 });    // 이름 순 내림차순
        break;
      case "likes":
        users = await UserModel.find({ name: new RegExp(user_name) }).sort({ likeCount: -1 });  //like count 순
        break;
      case "updatedAt":
        users = await UserModel.find({ name: new RegExp(user_name) }).sort({ updatedAt: -1 });  // update tns
        break;
      default:
        users = await UserModel.find({ name: new RegExp(user_name) });
        break;
    }
    return users;
  }

  /*
  findAll()
  모든 user정보 가져오기
  */
  static findAll() {
    return UserModel.find({});
  }

  /*
  findProfileImgById()
  user id로 프로필 이미지 이름 찾기
  */
  static async findProfileImgById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user.profileImg;
  }

  /*
  update()
  user 정보 update
  */
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  /*
  updateLikeStatus()
  유저의 좋아요 수와 status 갱신하기 위한 함수
  */
  static async updateLikeStatus({ user_id, fieldToUpdate, value }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: value };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  /*
  updateLikeListPush()
  좋아요를 클릭한 사람의 이름 추가
  */
  static async updateLikeListPush({ user_id, value }) {
    const updatedUser = await UserModel.findOneAndUpdate({ id: user_id }, {
      $push: { liked: { name: value } }
    });
    return updatedUser;
  }

  /*
  updateLikeListDel()
  좋아요를 클릭한 사람의 이름 삭제
  */
  static async updateLikeListDel({ user_id, value }) {
    const updatedUser = await UserModel.findOneAndUpdate({ id: user_id }, {
      $pull: { liked: { name: value } }
    });
    return updatedUser;
  }

  /*
  updatePassword()
  email 필드로 찾은 데이터의 password만 갱신하는 함수
  */
  static async updatePassword({ email, fieldToUpdate, hashedNewPassword }) {
    const filter = { email };
    const update = { [fieldToUpdate]: hashedNewPassword };
    const option = { returnOriginal: false };

    const updatedPasswordUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedPasswordUser;
  }

  /*
  findPasswordById()
  해당 user_id에 맞는 객체를 찾고 암호화 처리된 패스워드를 넘겨준다.
  */
  static async findPasswordById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user.password;
  }

  /*
  deleteOneUser()
  user 컬렉션에서 user_id와 매칭되는 user 정보 하나를 삭제하는 함수
  */
  static async deleteOneUser({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
    return user;
  }


  /*
  deleteAllById()
  각 컬렉션에서 user_id와 매칭되는 모든 documents를 삭제하는 함수
  */
  static async deleteAllById({ user_id }) {
    await AwardModel.deleteMany({ user_id });
    await CertificateModel.deleteMany({ user_id });
    await EducationModel.deleteMany({ user_id });
    await ProjectModel.deleteMany({ user_id });
  }

  /*
  createRandomPassword()
  임의 비밀번호 생성 함수
  */
  static async createRandomPassword() {
    const randStr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
      'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    let randomPassword = "";
    for (var j = 0; j < 5; j++){
      randomPassword += randStr[Math.floor(Math.random() * randStr.length)];
    }
    return randomPassword;
  }

}

export { User };
