/**
 * 2022-03-22 user 탈퇴 기능 구현 
 * - user 데이터 삭제 : 완료
 * - user_id에 따른 mvp 정보 삭제 구현 : 완료 
 * 작성자 : 장정민
 * 
 */


import { User } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        '비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const myKeys = Object.keys(toUpdate);
    for (let i = 0; i < myKeys.length; i++) {
      if (toUpdate[myKeys[i]]) {
        const fieldToUpdate = myKeys[i];
        const newValue = toUpdate[myKeys[i]];
        user = await User.update({ user_id, fieldToUpdate, newValue });
      }
    }

    return user;
  }

  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return user;
  }



  static async setPassword({user_id, toUpdate}) {
    let user = await User.findById({user_id});
    if (!user) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (toUpdate.newPw) {
      const fieldToUpdate = "password"
      const hashednewPassword = await bcrypt.hash(toUpdate.newPw, 10);
      const newValue = hashednewPassword;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }
    return {status : "비밀번호 변경 성공"};
  }

  /*
   * deleteUser
   *
   */
    static async deleteUser({ user_id }) {
      const user = await User.deleteOneUser({ user_id });
      // db에서 찾지 못한 경우, 에러 메시지 반환
      if (!user) {
        const errorMessage =
          '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
        return { errorMessage };
      }
      return user;
    }
  
    
  /*
   * deleteUserAllInfo
   *
   */
    static async deleteUserAllInfo({ user_id }){
      await User.deleteAllByUserId({ user_id });
    }
    
}

export { userAuthService };
