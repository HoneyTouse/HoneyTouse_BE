// 회원가입 폼 유효성 검사

class FormValidator {
  // 이름 유효성 검사
  // ---> 한글 2~4자
  static isValidName(name) {
    const nameRegex = /^[가-힣]{2,4}$/;
    return nameRegex.test(name);
  }

  // 이메일 유효성 검사
  static isValidEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i;
    return emailRegex.test(email);
  }

  // 전화번호 유효성 검사
  // ---> 010으로 시작하는 총 11자리 숫자
  static isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^010\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
  }

  // 비밀번호 유효성 검사
  // ---> 영문, 숫자, 특수문자를 조합하여 8-16자리를 입력
  // 특수문자 가능한 것 : ! @ # $ % ^ & * ( ) - _ + = < > ?
  static isValidPassword(plainPassword) {
    const passwordRegex = /^[A-Za-z0-9!@#$%^&*()-_+=<>?]{8,16}$/;
    return passwordRegex.test(plainPassword);
  }
}

module.exports = FormValidator;
