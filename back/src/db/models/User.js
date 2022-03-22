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

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

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


  static async findByPassword({nowPassword}) {
    const password = await UserModel.findOne({password : nowPassword});
    return password;
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
 
}

export { User };
