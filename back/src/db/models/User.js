import { UserModel } from "../schemas/user";
import { AwardModel } from '../schemas/award';
import { CertificateModel } from '../schemas/certificate';
import { EducationModel } from '../schemas/education';
import { ProjectModel } from '../schemas/project';

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findManyByName({ user_name}){
    const users = await UserModel.find({name: new RegExp(user_name)})
    return users
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  // user id로 프로필 이미지 이름 찾기
  static async findProfileImgById({user_id}){
    const user = await UserModel.findOne({ id: user_id });
    return user.profileImg;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]:newValue };
    const option = { returnOriginal: false };
 
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
  // 유저의 좋아요 수와 status 갱신하기 위한 함수
  static async updateLikeStatus({ user_id, fieldToUpdate, value }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]:value };
    const option = { returnOriginal: false };
 
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  // // 좋아요를 클릭한 사람의 이름 추가
  // static async updateLikeListPush({ user_id, value }) {
  //   const updatedUser = await UserModel.findOneAndUpdate({id:user_id}, {
  //     $push: {liked : {name:value} }});
  //   return updatedUser;
  // }
  // // 좋아요를 클릭한 사람의 이름 삭제
  // static async updateLikeListDel({ user_id, value }) {
  //   const updatedUser = await UserModel.findOneAndUpdate({id:user_id}, {
  //     $pull: {liked : {name:value} }});
  //   return updatedUser;
  // }
  /*
   * updatePassword()
   *email 필드로 찾은 데이터의 password만 갱신하는 함수
   */
  static async updatePassword({ email, fieldToUpdate, hashedNewPassword }) {
    const filter = { email };
    const update = { [fieldToUpdate]: hashedNewPassword };
    const option = { returnOriginal: false };

    const updatedPasswordUser =await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedPasswordUser;
  }

  // 해당 user_id에 맞는 객체를 찾고 암호화 처리된 패스워드를 넘겨준다.
  static async findByPassword({user_id}) {
    const user = await UserModel.findOne({id:user_id});
    return user.password;
  }

  /*
   * deleteOneUser()
   *user 컬렉션에서 user_id와 매칭되는 user 정보 하나를 삭제하는 함수
   */
   static async deleteOneUser({ user_id }) {
    const user = await UserModel.deleteOne({ id: user_id });
   return user;
  }

 
  /*
   * deleteAllByUserId()
   *각 컬렉션에서 user_id와 매칭되는 모든 documents를 삭제하는 함수
   */
  static async deleteAllByUserId({ user_id }) {
    await AwardModel.deleteMany({user_id});
    await CertificateModel.deleteMany({user_id});
    await EducationModel.deleteMany({user_id});
    await ProjectModel.deleteMany({user_id});
  }

  /*
   * createRandomPassword()
   * 임의 비밀번호 생성 함수
   */
    static async createRandomPassword() { 
      const randStr = ['a','b','c','d','e','f','g','h','i','j','k','l',
      'm','n','o','p','q','r','s','t','u','v','w','x','y','z',
      '1','2','3','4','5','6','7','8','9','0'];
      let randomPassword="";
      for (var j=0; j<5; j++)
      randomPassword += randStr[Math.floor(Math.random()*randStr.length)];
      return randomPassword;
    };
 
}

export { User };
