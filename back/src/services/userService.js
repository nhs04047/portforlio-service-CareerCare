/*
 * 2022-03-22 user 탈퇴 기능 구현 
 * - user 데이터 삭제 : 완료
 * - user_id에 따른 mvp 정보 삭제 구현 : 완료 
 * 작성자 : 장정민
 * 
 * <user 검색, 프로필 이미지 변경 구현> 
 * 작성자 : 김보현
 * 일자 : 2022-03-25
 * 
 */
import { User, Like } from '../db'; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import fs from 'fs'
import {utile} from './utile'

class userAuthService {
  /*
  * addUser()
  * 회원 가입 서비스
  */
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
    createdNewUser.errorMessage = null;   // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  /*
  * getUser()
  * 로그인 서비스, email과 password정보로 비밀번호 일치 여부 확인과 jwt 토큰 부여
  */
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

  /*
  * getUsers()
  * 모든 user의 정보를 반환
  */
  static async getUsers({ hostName }) {
    const users = await User.findAll();
    // 프로필 사진 URL 함께 반환
    const newUsers = utile.addImgPathArr(users, hostName);
    
    return newUsers;
  }

  /*
  * getSearchedUsers()
  * user의 이름을 받아 user의 정보를 찾은 후 정렬 option에 맞게 정렬해서 반환 
  */
  static async getSearchedUsers({ user_name, sortingOption }, hostName) {
    const searchedUsers = await User.findManyByName({ user_name, sortingOption });
    // 프로필 사진 URL 함께 반환
    const newSearchedUsers = utile.addImgPathArr(searchedUsers, hostName);
    
    return newSearchedUsers
  }

  /*
  * setUser()
  * user정보 수정
  */
  static async setUser({ user_id, toUpdate }, hostName) {
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
    // 프로필 사진 URL 함께 반환
    const newUser = utile.addImgPath(user, hostName);

    return newUser;
  }
  /*
  * getUserInfo()
  * user id를 이용한 user 정보 반환
  */
  static async getUserInfo({ user_id }, hostName) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    // 프로필 사진 URL 함께 반환
    const newUser = utile.addImgPath(user, hostName);
    
    return newUser;
  }

  /*
  * setPassword()
  * 아이디/비밀번호 동일성 검사 후 새로운 비밀번호를 db 모델에 넘겨주는 함수
  */
  static async setPassword({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인한다.
    let user = await User.findById({ user_id });
    const password = toUpdate.pw;
    // 해당 id 유저의 비밀번호와 입력한 현재 비밀번호가 같은지 여부 확인한다.
    const userPassword = await User.findPasswordById({ user_id });
    // compare(새로 입력된 패스워드, 해쉬된 패스워드) -> 같으면 true, false
    const compareResult = await bcrypt.compare(password, userPassword);

    // 유저가 없을 시 에러메시지 반환한다.
    if (!user) {
      const errorMessage = '가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    // 입력한 현재 비밀번호가 다르면 false 반환한다.
    if (!compareResult) {
      return false;
    }

    // 해당 id 유저의 비밀번호를 변경할려는 비밀번호에 hash를 적용하여 db에 모델에 넘겨준다.
    if (toUpdate.newPw) {
      const fieldToUpdate = "password"
      // bcrypt.hash 적용
      const hashednewPassword = await bcrypt.hash(toUpdate.newPw, 10);

      const newValue = hashednewPassword;
      user = await User.update({ user_id, fieldToUpdate, newValue });

    }
    return true;
  }

  /*
  * setProfileImg()
  * 프로필 이미지 변경 (이미지 경로 전송)
  */
  static async setProfileImg({ user_id, toUpdate }, hostName) {

    let user = await User.findById({ user_id });

    if (user.profileImg !== "default_img/default_profile_img.jpg")
      // 기존 프로필 사진 삭제
      fs.unlink(`./uploads/profile_img/${user.profileImg}`, (error) => {    
        if (error) {
          console.log(error)
        }
      })

    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    const fieldToUpdate = "profileImg";
    const newValue = toUpdate;
    user = await User.update({
      user_id,
      fieldToUpdate,
      newValue,
    });

    const newUser = utile.addImgPath(user, hostName);

    return newUser;
  };

  /*
  * getProfileImgURL()
  * 프로필 이미지 경로 가져오기
  */
  static async getProfileImgURL({ user_id }, hostName) {

    let user = await User.findById({ user_id });

    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const profileImg = await User.findProfileImgById({ user_id });
    if (!profileImg) {
      const errorMessage =
        '프로필 이미지가 없습니다.';
      return { errorMessage };
    }
    // 프로필 사진 URL 함께 첨부
    const profileImgURL = "http://" + hostName + "/profileImg/" + profileImg;
    console.log(profileImgURL)

    return profileImgURL;

  }


  /*
  * deleteUser()
  * user 정보 삭제
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

    // 좋아요를 받은 name 객체 배열 반환
    static async getlikeList({userId}) {
      // 입력 받은 아이디가 db에 존재하는지 확인/오류 처리
      const currentUser = await User.findById({ user_id: userId });

      if (!currentUser) {
        const errorMessage =
          '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
        return { errorMessage };
      }
      console.log(currentUser);
      return currentUser
    }
    
  // * deleteUserAllInfo()
  // * user의 학력, 수상, 자격증 등 모든 data 삭제
  // */
  static async deleteUserAllInfo({ user_id }) {
    await User.deleteAllById({ user_id });
  }

  /*
  * setLike()
  * 좋아요 기능 설정
  */
  static async setLike({ currentUserId, otherUserId }) {
    // 각각의 입력 받은 아이디가 db에 존재하는지 확인/오류 처리
    const currentUser = await User.findById({ user_id: currentUserId });
    const otherUser = await User.findById({ user_id: otherUserId });

    if (!currentUser) {
      const errorMessage =
        '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!otherUser) {
      const errorMessage =
        '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    // 두 유저가 서로 좋아요 관계라면 좋아요 객체를 리턴하고, 아니면 null 리턴
    const isLiked = await Like.findByUser({ currentUser, otherUser });
    let updatedLike = {};
    let updatedUser = {};
    
    // 좋아요 객체가 있다면 -> likeCount 1감소(왜? 좋아요 버튼을 클릭한 시점에 이미 좋아요 관계니깐 좋아요 취소라는 의미) -> status는 false -> 좋아요를 받은 user 정보 갱신 -> 두 유저의 좋아요 객체 삭제
    if (isLiked) {
      let fieldToUpdate = "likeCount";
      const newValue = otherUser.likeCount - 1;
      const newStatus = false;
      const newLike = currentUser.name;
      updatedUser = await User.updateLikeStatus({
        user_id : otherUserId,
        fieldToUpdate,
        value : newValue,
      });
      fieldToUpdate = "status";
      updatedUser = await User.updateLikeStatus({
        user_id : otherUserId,
        fieldToUpdate,
        value : newStatus,
      });
      updatedUser = await User.updateLikeListDel({
        user_id : otherUserId,
        value : newLike,
      });
      await Like.deleteById({ isLiked });
      updatedLike = { status: false, likeCount: updatedUser.likeCount };
    } // null 이라면 -> likeCount 1증가-> status는 True -> 좋아요를 받은 user 정보 갱신 -> 두 유저의 좋아요 객체 생성
    else {
      let fieldToUpdate = "likeCount";
      const newValue = otherUser.likeCount + 1;
      const newStatus = true;
      const newLike = currentUser.name;
      updatedUser = await User.updateLikeStatus({
        user_id : otherUserId,
        fieldToUpdate,
        value : newValue,
      });
      fieldToUpdate = "status";
      updatedUser = await User.updateLikeStatus({
        user_id : otherUserId,
        fieldToUpdate,
        value : newStatus,
      });
      updatedUser = await User.updateLikeListPush({
        user_id : otherUserId,
        value : newLike,
      });
      await Like.create({ currentUser, otherUser });
      updatedLike = { status: true, likeCount: updatedUser.likeCount };
    }
    // console.log("updatedUser :", updatedUser);
    // 반환 : 현재 상태를 나타내는 status와 likeCount 반환 / user의 status/likeCount 정보 갱신
    return updatedLike;
  }

  /*
  * getLike()
  * 좋아요 수 반환
  */
  static async getLike({currentUserId, otherUserId}) {
    // 입력 받은 아이디가 db에 존재하는지 확인/오류 처리
    const currentUser = await User.findById({ user_id: currentUserId });
    const otherUser = await User.findById({ user_id: otherUserId });

    let updatedLike = {};

    if (!currentUser) {
      const errorMessage =
        '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    if (!otherUser) {
      const errorMessage =
        '해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const isLiked = await Like.findByUser({ currentUser, otherUser });
    if (isLiked) {
      updatedLike = { userStatus: true};
    } 
    else {
      updatedLike = { userStatus: false};
    }
    return updatedLike;
  }

  /*
  * setNewPassword()
  * 비밀번호 재발급 시 email로 user정보가 존재하는지 확인하고 새로운 비밀번호를 db에 저장하는 함수
  */
  static async setNewPassword({ email }) {
    //email로 유저 찾고 
    let user = await User.findByEmail({ email });
    //email 정보와 매칭되는 유저가 없으면 에러메세지 리턴
    if (!user) {
      const errorMessage =
        '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    const newPassword = await User.createRandomPassword();
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    //업데이트할 field를 password로 설정
    const fieldToUpdate = "password"
    //updatedUser에 password를 업데이트한 user정보 저장
    const updatedUser = await User.updatePassword({ email, fieldToUpdate, hashedNewPassword })

    return { newPassword, updatedUser };
  }
}

export { userAuthService };
