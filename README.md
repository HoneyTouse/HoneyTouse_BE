# 🐝꿀단집 BackEnd Repository

> <b>"당신의 감성을 흔드는 인테리어 꿀템이 가득한 꿀단집"</b>

> "특별한 감성을 담은 소품과 가구를 원하는 당신을 위한 꿀템이 가득!
> 저희 꿀단집에서 만나보세요.” 🍯🏠

> 📌 <b>HoneyTouse URL</b> : http://honeytouseclient.s3-website.ap-northeast-2.amazonaws.com/<br>
> 📌 <b>HoneyTouse ReadMe</b> : https://github.com/HoneyTouse<br>
> 📌 <b>HoneyTouse BackEnd Github</b> : https://github.com/HoneyTouse/HoneyTouse_BE

![리드미최상단](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/6374c883-fad2-40ad-bec2-01fcf71cac01)

---

## 바로가기

- [프로젝트 개요](#프로젝트-개요)<br>
- [프로젝트 아키텍쳐](#프로젝트-아키텍쳐)<br>
- [구현 내용](#구현-내용)<br>
- [이슈 해결](#이슈-해결)<br>
- [배포전략](#배포전략)<br>
- [프로젝트 성찰](#프로젝트-성찰)<br>

---

## 프로젝트 개요

- ### 기간 및 방식 <br>

  #### <b>기간</b>

  - <b>1차</b> : 기획 및 개발 (24.02.19 ~ 24.03.01) <i>[2주]</i><br>

  - <b>2차</b> : 리팩토링 (24.03.08 ~ ) <i>[자율]</i><br>

  #### <b>진행 방식</b>

  | 구분 | 방식과 내용                                                                                                                                                                                                |
  | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 1차  | • <b>방식</b> : 프론트엔드와 백엔드 담당자가 일정 기간 동안 함께 개발을 진행<br> • <b>위치</b> : (주)엘리스가 보유하고 있는 프라이빗 GitLab 저장소<br> • <b>내용</b> : 인증 기능을 갖춘 기본 CRUD API 개발 |
  | 2차  | • <b>방식</b> : 필요에 따라 특정 부분을 담당하는 팀원끼리 소통하여 추가적인 개발을 진행함.<br> • <b>위치</b> : 자율적으로 생성한 Github Organization<br> • <b>내용</b> : 추가적으로 필요한 부분을 진행함.  |

  <br>

- ### 인원 및 역할 <br>

  - 백엔드 3명<br>

  | 이름   | 역할                                                                                     |
  | ------ | ---------------------------------------------------------------------------------------- |
  | 문채영 | • Admin <i>(관리자 기능)</i> API 작성<br>• Order <i>(회원/비회원 주문 CRUD)</i> API 작성 |
  | 이가린 | • User <i>(인증/인가, 개인정보 CRUD)</i> API 작성<br> • 클라이언트 및 서버 자동 배포<br> |
  | 최정민 | • Category <i>(카테고리 CRUD)</i> 작성<br>• Product <i>(상품 CRUD)</i> API 작성<br>      |

  - 공통 : POSTMAN 및 Thunder Client로 API 테스트 후, 노션으로 문서화
    <br>

- ### 기술스택 <br>

  - <b>백엔드</b> : Node.js, Express, MongoDB, JavaScript, JWT
  - <b>배포</b> : AWS S3, Route53, Cloudfront, EC2
  - <b>기타</b> : multer S3

| 기술           | 선정 이유                                                                                                                                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>Express</b> | • 가볍고 유연하여 빠르고 확장 가능한 웹 애플리케이션을 구축하는 데 도움이 되는 Node.js 라이브러리임.<br> • 라우팅 및 오류 처리와 같은 다양한 기능 처리를 단순화하였기 때문에 코드 작성이 용이해 질 것이라고 예상되어 채택함. |
| <b>MongoDB</b> | • JavaScript 개발자가 데이터를 원활하게 시작하고 작업할 수 있도록 직관적이고 쉽게 만드는 JSON과 유사한 문서 구조를 갖고 있음.<br>• 수월한 프로젝트 진행을 위해 채택함.                                                       |
| <b>JWT</b>     | • stateless(상태 비저장) 인증인 JWT는 서버 로드를 줄이고 인증 프로세스 속도를 높임.                                                                                                                                          |
| <b>AWS</b>     | • AWS에서 웹 애플리케이션 호스팅 및 배포의 거의 모든 측면을 포괄하는 <u>광범위한 서비스</u>를 제공하며, <u>대량의 트래픽 처리</u>를 쉽게 할 수 있도록 설계되어 활용함.                                                       |

- ### 개발환경 <br>

  - Node.js : v20.9.0<br>
  - express : ^4.18.2<br>
  - Mongoose : ^8.1.2<br>

- ### 라이브러리 <br>

  - eslint, prettier, nodemon, bcrypt, cors, dotenv, ejs, express, jsonwebtoken, mongoose, nodemailer, swagger-ui-express, yaml, passport, multer

---

## 프로젝트 아키텍쳐

### 전체 프로젝트 구조

<br>
<br>

### 백엔드 프로젝트 구조

![image](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/76bde51d-591d-426d-863b-4beb404c3330)
Tool : Figma

<details>
<summary><b>폴더별 기능 설명</b></summary>
<div markdown="1">

![image](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/dc2ba495-d43a-49ad-8cc2-d5d45f809e78)

![image](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/6bf39f42-f1de-4f17-a31c-ca270526db76)

![image](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/5fe848b4-977b-4868-86ed-8077704cadd6)

</div>
</details>
<br>

### MongoDB 스키마

![꿀단집mongodb스키마](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/9c1f5ece-9a82-4b77-ae8b-37d6661df0ab)
Tool : Moon Modeler
<br>
<br>

### 로그인 시퀀스 다이어그램

Tool : GitMind
<br>
<br>

### 구글 로그인 시퀀스 다이어그램

<br>

---

## 구현 내용

> - 트랜잭션을 고려한 CRUD 작업
> - Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현
> - Passport를 활용한 소셜 로그인 (구글 로그인) 구현
>   <br>

### 1. 트랜잭션을 고려한 CRUD 작업

- <b>내용</b> :  서비스 모듈에서 생성, 수정, 삭제 메소드에 mongoose 트랜잭션을 적용함.
- <b>이유</b> : 작업 중 데이터 일관성과 무결성을 보장하기 위함임.
- <b>효과</b> : 작업 실패 시 변경 사항을 롤백하여 부분 업데이트를 방지하고, 데이터베이스 안정성을 유지할 수 있음.

<details>
<summary><i>트랜잭션의 개념과 우리 서버에서의 트랜잭션 처리</i></summary>
<div markdown="1">

https://github.com/HoneyTouse/HoneyTouse_BE/wiki/%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%9A%B0%EB%A6%AC-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C%EC%9D%98-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%B2%98%EB%A6%AC

</div>
</details>
<br>

### 2. Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현

- <b>내용</b> : Nodemailer로 랜덤 생성된 6자리 숫자를 사용자가 입력한 이메일로 발송함. 이 숫자는 DB의 EmailVerification 컬렉션에 저장되었다가 5분 후 자동 삭제됨.
- <b>이유</b> : 원래 서버에서 발송한 인증코드를 확인하는 로직으로 구현을 하였음. 하지만 데이터베이스 저장 없이 즉시 검증하는 것이 더 비효율적이라고 판단하였음. <u>시간마다 자동 생성되는 것을 코드로 직접 구현해야 하며, 빈번한 코드 생성을 하게 되므로 서버에 부담이 됨.</u>
- <b>효과</b> : 확인 기간을 제한하여 보안을 강화하고 오용 가능성을 줄일 수 있음.

<details>
<summary><i> 인증 코드 저장 스키마 - data-access/schema/emailVerification.js</i></summary>
<div markdown="1">

```
const { Schema } = require('mongoose');

const emailVerificationSchema = new Schema(
  {
    // 전송요청한 이메일
    email: {
      type: String,
      required: true,
      unique: true,
    },

    // 서버에서 발송한 인증 번호
    verificationCode: {
      type: String,
      required: true,
    },

    // 생성 시각
    createdAt: {
      type: Date,
      default: Date.now,
      expires: '5m', // 5분 후에 문서가 자동으로 삭제되도록 설정
    },
  },
  {
    collection: 'EmailVerification',
    versionKey: false,
    timestamps: true,
  },
);

module.exports = emailVerificationSchema;
```

</div>
</details>

<details>
<summary><i> 이메일 인증 발송 - service/authService.js</i></summary>
<div markdown="1">

```
  // 이메일 인증 발송 메소드
  async sendVerificationCode(toemail) {
    const transporter = createTransporter();

    function createTransporter() {
      return nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: config.adminEmail, // 보내는 이메일 주소
          pass: config.adminPW, // 보내는 이메일 계정의 암호
        },
      });
    }
    // 랜덤한 6자리 숫자 생성
    const generateVerificationCode = () => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    let verificationCode = generateVerificationCode();

    const mailOptions = {
      from: 'honeytousedb@gmail.com', // 보내는 이메일 주소
      to: toemail, // 수신자 이메일 주소
      subject: '꿀단집 쇼핑몰 이메일 인증 코드', // 이메일 제목
      text: `인증 코드: ${verificationCode}`, // 이메일 내용
    };

    // 인증 코드 이메일 발송
    await transporter.sendMail(mailOptions);
    console.log('인증 코드 이메일이 성공적으로 전송되었습니다.');

    // DB의 EmailVerification모델에 해당 내역을 저장
    await EmailVerification.create({ email: toemail, verificationCode });

    return verificationCode;
  }
```

</div>
</details>
<br>

### 3. Passport를 활용한 구글 로그인 구현

- <b>내용</b>
- <b>이유</b>
- <b>효과</b>

---

## 이슈 해결

### 문제

- **주문 처리 로직에서 비회원인 경우를 미리 고려하지 않은 POST 요청**
  - 본 쇼핑몰은 회원과 비회원이 모두 상품 주문을 할 수 있음.
  - 쇼핑몰에 가입한 회원이 POST 요청을 통해 주문하는 경우만 고려하였음.
  - orderRouter의 orderController 부분에서 customerId를 처리하는 중 로그인 체크 미들웨어를 거쳐서 바로 req.Id로 값을 할당하였음.
  - 따라서 <u>비회원은 토큰이 없어서 주문 처리가 되지 않는 문제가 발생</u>하였음.

### 해결과정

- orderController에서 주문 추가를 담당하는 postOrder 함수를 분기처리하여 회원과 비회원을 구분함.
  - 회원 : 토큰에서 유저 Id를 확인하여 customerId를 할당
  - 비회원 : 숫자를 랜덤생성하는 함수를 활용하여 customerId를 할당 (ex.guest_1646056800000_1234)
- 이를 통해 회원과 비회원이 모두 동일한 서비스를 경험할 수 있으며, <u>데이터베이스에서는 회원과 비회원을 구분하여 효율적으로 주문내역을 관리</u>할 수 있게 됨.

<details>
<summary><i>회원과 비회원을 구분하는 주문 내역 처리 - controller/orderController.js</i></summary>
<div markdown="1">

![이슈해결코드](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/89c38b39-4a54-42e8-8718-065591196814)

</div>
</details>

---

## 배포 전략

---

## 프로젝트 성찰

- ### 1. 백엔드에서의 설계와 에러처리의 중요성을 실감함.

  - Node.js와 Express를 사용하여 진행한 첫 번째 웹 프로젝트이자 백엔드 프로젝트였기 때문에 초반에는 순탄하지 않았음. HTML, CSS, JavaScript와 같은 프론트엔드 기술을 위주로 학습한 것이 하나의 이유가 될 수 있음.
  - 비즈니스 로직을 인증/인가 유무에 따라 분류하지 않았기 때문에 코드를 크게 수정한 적이 있음. <u>프로젝트 후반에 코드를 전면 수정하는 일을 최대한 없도록 예방하려면 초기에 다양한 시나리오를 예상하고 체계적으로 설계하는 것이 중요하다</u>고 생각함.
  - 코드베이스가 늘어남에 따라 오류 수도 늘어났음. 이러한 오류는 내 코드의 문제를 추적하고 이해하는 데 큰 도움이 되었음.
  - 따라서 에러처리를 제대로 하는 것도 중요하다고 생각함.<br><u>(적절한 위치에서의 정확한 에러코드와 메시지 전달)</u>

- ### 2. 네트워킹에 대한 폭넓은 이해의 필요성을 느낌.

  - 코드 작성을 마치고 배포를 해야 했을 때, 네트워크에 대한 지식이 부족하여 어려움을 겪었음.
  - 일례로, 사용할 포트 번호(80 또는 3000)를 잘못 설정하는 것 같이 로드 밸런서를 설정하는 데 어려움이 있었음. 게다가 NS, CNAME, A 등 다양한 종류의 DNS 레코드가 익숙하지 않아 일일이 찾아봐야 했음.
  - 배포하는 동안 시스템의 한 부분이 정확히 설정되지 않으면, 코드 작성과 달리 단순히 오류가 발생하는 것이 아니라는 것을 깨달음. <u>전체 시스템이 작동하지 않아 문제를 식별하기 어려울 수 있음.</u>
  - 이를 통해 <u>배포 프로세스 중에 동기화 및 네트워킹 세부 사항에 세심한 주의를 기울이는 것이 중요하다</u>는 사실을 배웠음.

- ### 결론

  - 전반적으로 이 프로젝트를 통해 백엔드 개발에서 신중한 계획과 견고한 디자인의 중요성을 배웠음.
  - 앞으로는 네트워킹에 대한 이해의 폭을 넓히고, 오류 처리 기술을 향상시키며, 시스템 설계 기술을 연마할 계획임.
  - 이러한 기초적인 경험은 향후 더욱 복잡하고 효율적인 프로젝트를 위한 기반을 마련함.
