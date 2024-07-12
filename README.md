# 🐝꿀단집 BackEnd Repository

> <b>"당신의 감성을 흔드는 인테리어 꿀템이 가득한 꿀단집"</b>

> "특별한 감성을 담은 소품과 가구를 원하는 당신을 위한 꿀템이 가득!
> 저희 꿀단집에서 만나보세요.” 🍯🏠

> 📌 <b>HoneyTouse URL</b> : https://www.honeytouse.com/<br>
> 📌 <b>HoneyTouse ReadMe</b> : https://github.com/HoneyTouse<br>
> 📌 <b>HoneyTouse BackEnd Github</b> : https://github.com/HoneyTouse/HoneyTouse_BE

![리드미최상단](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/6374c883-fad2-40ad-bec2-01fcf71cac01)

---

## 바로가기

- [프로젝트 개요](#프로젝트-개요)<br>
- [프로젝트 아키텍쳐](#프로젝트-아키텍쳐)<br>
- [구현 내용](#구현-내용)<br>
- [이슈 해결](#이슈-해결)<br>
- [배포](#배포)<br>
- [느낀점](#느낀점)<br>

---

## 프로젝트 개요

- ### 기간 및 방식 <br>

  #### <b>기간</b>

  - <b>1차</b> : 기획 및 개발 (24.02.19 ~ 24.03.01) <i>[2주]</i><br>

  - <b>2차</b> : 리팩토링 (24.03.08 ~ ) <i>[자율]</i><br>

  #### <b>진행 방식</b>

  | 구분 | 방식과 내용                                                                                                                                                                                                                 |
  | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 1차  | • <b>방식</b> : 프론트엔드와 백엔드 담당자가 <b>`2주 동안 함께`</b> 개발을 진행<br> • <b>위치</b> : (주)엘리스가 보유하고 있는 프라이빗 GitLab 저장소<br> • <b>내용</b> : 인증 기능을 갖춘 기본 CRUD API 개발               |
  | 2차  | • <b>방식</b> : <b>`필요에 따라`</b> 특정 부분을 담당하는 팀원끼리 소통하여 <b>`추가적인 개발`</b>을 진행함.<br> • <b>위치</b> : 자율적으로 생성한 Github Organization<br> • <b>내용</b> : 추가적으로 필요한 부분을 진행함. |

  <br>

- ### 인원 및 역할 <br>

  - 백엔드 3명<br>

  | 이름   | 역할                                                                                                         |
  | ------ | ------------------------------------------------------------------------------------------------------------ |
  | 문채영 | • Admin <i>(관리자 기능)</i> API 작성<br>• Order <i>(회원/비회원 주문 CRUD)</i> API 작성                     |
  | 이가린 | • User <i>(인증/인가, multer 이미지 처리, 개인정보 CRUD)</i> API 작성<br> • 클라이언트 및 서버 자동 배포<br> |
  | 최정민 | • Category <i>(카테고리 CRUD)</i> 작성<br>• Product <i>(상품 CRUD)</i> API 작성<br>                          |

  - 공통 : POSTMAN 및 Thunder Client로 API 테스트 후, 노션으로 문서화
    <br>

- ### 기술스택 <br>

  - <b>백엔드</b> : Node.js, Express, MongoDB, JavaScript, JWT, Multer
  - <b>배포</b> : AWS S3, Route53, Cloudfront, EC2, Github actions appleboy/ssh-action

| 기술           | 선정 이유                                                                                                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>Express</b> | • 가볍고 유연하여 빠르고 확장 가능한 웹 애플리케이션을 구축하는 데 도움이 되는 Node.js 라이브러리임.<br> • 라우팅 및 오류 처리와 같은 <b>`다양한 기능 처리를 단순화`</b>하였기 때문에 <b>`코드 작성이 용이`</b>해 질 것이라고 예상되어 채택함. |
| <b>MongoDB</b> | • JavaScript 개발자가 데이터를 원활하게 시작하고 작업할 수 있도록 직관적이고 쉽게 만드는 <b>`JSON과 유사한 문서 구조`</b>를 갖고 있어서, 수월한 프로젝트 진행을 위해 채택함.                                                                   |
| <b>JWT</b>     | • stateless(상태 비저장) 인증인 JWT는 서버 로드를 줄이고 인증 프로세스 속도를 높임.                                                                                                                                                            |
| <b>Multer</b>     | • HTTP 요청에서 파일 데이터를 추출하고 관리하는 프로세스를 단순화하여 서버의 이미지 처리를 편리하게 해주는 장점이 있음.                                                                     |
| <b>AWS</b>     | • AWS에서 웹 애플리케이션 호스팅 및 배포의 거의 모든 측면을 포괄하는 <b>`광범위한 서비스`</b>를 제공하며, <b>`대량의 트래픽 처리`</b>를 쉽게 할 수 있도록 설계되어 활용함.                                                                     |
| <b>Github Action</b>     | • 스크립트를 작성하여 push할 경우 최신 변경 사항으로 유지됨.<br>• GitHub의 CI/CD 기능을 활용하고 <b>`리포지토리와 원활하게 통합`</b>할 수 있어서 편의성을 높임.                                                              |

- ### 개발환경 <br>

  - Node.js : v20.9.0<br>
  - express : ^4.18.2<br>
  - Mongoose : ^8.1.2<br>

- ### 라이브러리 <br>

  - eslint, prettier, nodemon, bcrypt, cors, dotenv, ejs, express, jsonwebtoken, mongoose, nodemailer, swagger-ui-express, yaml, multer, appleboy/ssh-action

---

## 프로젝트 아키텍쳐

### 전체 프로젝트 구조

![꿀단집구조(ver 2)](https://github.com/HoneyTouse/.github/assets/127278410/e9218862-d1b5-4452-9f77-f20badc68cd7)
<br>
<br>

### MongoDB 스키마

![꿀단집mongodb스키마](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/9c1f5ece-9a82-4b77-ae8b-37d6661df0ab)
Tool : Moon Modeler
<br>
<br>

### 로그인 시퀀스 다이어그램

![로그인시퀀스그램](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/e22b4799-dd29-4329-b7ad-d9f241985db2)
Tool : Visual Paradigm
<br>
<br>

---

## 구현 내용

> - 트랜잭션을 고려한 CRUD 작업
> - Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현
> - Logging 라이브러리인 Pino 적용
> - multer를 활용한 이미지 업로드 처리 (70% 압축, 1MB 제한)
>   <br>

### 1. 트랜잭션을 고려한 CRUD 작업

- <b>내용</b> : transactionUtils.js 모듈을 별도로 생성하여 서비스 모듈에서 <b>`생성, 수정, 삭제`</b> 메소드에 mongoose 트랜잭션을 적용함.
- <b>이유</b> : 작업 중 데이터 일관성과 무결성을 보장하기 위함임.
- <b>효과</b> : <b>`작업 실패 시 변경 사항을 롤백하여 부분 업데이트를 방지`</b>하고, 데이터베이스 안정성을 유지할 수 있음.

<details>
<summary><i>우리 서버에서의 트랜잭션 처리</i></summary>
<div markdown="1">
<b>▼ 트랜잭션의 개념과 우리 서버에서의 트랜잭션 처리</b>
https://github.com/HoneyTouse/HoneyTouse_BE/wiki/%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98%EC%9D%98-%EA%B0%9C%EB%85%90%EA%B3%BC-%EC%9A%B0%EB%A6%AC-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C%EC%9D%98-%ED%8A%B8%EB%9E%9C%EC%9E%AD%EC%85%98-%EC%B2%98%EB%A6%AC

</div>
</details>
<br>

### 2. Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현

- <b>내용</b> : `Nodemailer`로 랜덤 생성된 6자리 숫자를 사용자가 입력한 이메일로 발송함. 이 숫자는 DB의 EmailVerification 컬렉션에 저장되었다가 <b>`5분 후 자동 삭제`</b>됨.
- <b>이유</b> : 원래 서버에서 발송한 인증코드를 확인하는 로직으로 구현을 하였음. 하지만 데이터베이스 저장 없이 즉시 검증하는 것이 더 비효율적이라고 판단하였음. <b>`시간마다 자동 생성되는 것을 코드로 직접 구현해야 하며, 빈번한 코드 생성을 하게 되므로 서버에 부담이 됨.`</b>
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

### 3. Logging 라이브러리인 Pino 적용

- <b>내용</b> : pino 라이브러리를 사용하여 로거(logger)를 생성하고, 로그 레벨을 'info'로 설정함.
- <b>이유</b> : 로그를 'info' 레벨로 설정하여 중요한 정보를 포함한 로그를 캡처하고, 효율적인 디버깅을 위함.
- <b>효과</b> : <b>`console.log()`</b>는 <b>`동기식`</b>이며 Node.js의 이벤트 루프를 차단할 수 있는 가능성이 있음. 하지만 <b>`pino`</b>는 <b>`비동기`</b>이며, 내부 버퍼링 매커니즘을 사용하여 여러 로그 메시지를 일괄 처리하므로, <b>`이벤트 루프를 차단할 가능성이 줄어듦`</b>.
<details>
<summary><i>pino를 적용한 후 로그 출력</i></summary>
<div markdown="1">
<b>▼ logging library 활용</b>
https://github.com/HoneyTouse/HoneyTouse_BE/wiki/logging-library-%ED%99%9C%EC%9A%A9
<br>

![pino설정](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/eed6f796-4c2c-4c6a-9969-c6df85c66df0)

</div>
</details>
<br>

### 4. multer를 활용한 이미지 업로드 처리

- <b>내용</b> : 클라이언트가 업로드한 파일을 multer 미들웨어를 통해 서버의 특정 디렉토리에 저장하는 기능을 구현함.
- <b>이유</b> : 프로필 이미지 변경하는 기능 구현 중 http 요청에서 form-data 형식의 데이터를 처리하기 위함.
- <b>효과</b> : 사용자는 자신의 프로필 이미지를 서버에 업로드하고, 서버는 이 <b>`파일을 특정 디렉토리에 저장`</b>하고, <b>`DB에 있는 이미지 경로를 반환`</b>하여 프로필 이미지를 사용할 수 있게 됨.
- <b>단점</b> :
  - 파일 저장 시 디렉토리 존재 여부를 체크하지 않아 <b>`디렉토리가 없으면 에러가 발생`</b>할 수 있음.
  - 추가적으로, 서버에 파일을 저장하는 방식은 <b>`서버의 디스크 공간을 많이 차지`</b>할 수 있음.<br>
    → 추후 진행한 프로젝트에서는 presigned URL을 받아서 AWS S3 버킷에 업로드하는 로직을 구현함.

<details>
<summary><i>multer로 프로필 이미지 변경 - service/authService.js</i></summary>
<div markdown="1">

▼ Multer을 활용한 우리 서버에서의 이미지 처리
https://github.com/HoneyTouse/HoneyTouse_BE/wiki/Multer%EC%9D%84-%ED%99%9C%EC%9A%A9%ED%95%9C-%EC%9A%B0%EB%A6%AC-%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C%EC%9D%98-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B2%98%EB%A6%AC

```
// 프로필 이미지 변경
  async uploadProfileImage(req) {
    return new Promise((resolve, reject) => {
      multerConfig.getUploadHandler()(req, null, async (err) => {
        if (err) {
          console.error('Error uploading profile image:', err);
          reject({
            success: false,
            message: 'Failed to upload profile image.',
          });
        } else {
          try {
            const imageUrl = req.file.path;

            // JWT 토큰에서 사용자 이메일을 추출하여 사용자 정보 가져오기
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, config.jwtSecret);
            const userId = decodedToken.id;

            // 사용자 찾기
            let user = await userDAO.findById(userId);

            if (!user) {
              throw new AppError(
                commonErrors.resourceNotFoundError,
                '해당 이메일로 가입한 회원이 없습니다.',
                400,
              );
            }

            // 사용자 정보 업데이트
            user.profileImage = imageUrl.replace('src\\public\\', '');

            const newProfileImage = user.profileImage;

            user = await userDAO.updateById(userId, {
              profileImage: newProfileImage,
            });

            resolve({ success: true, imageUrl: newProfileImage });
          } catch (error) {
            console.error('Error saving profile image URL:', error);
            reject({
              success: false,
              message: 'Failed to save profile image URL.',
            });
          }
        }
      });
    });
  }

```

</div>
</details>

---

## 이슈 해결

### 1. 주문 처리 로직에서 비회원인 경우를 미리 고려하지 않은 POST 요청

| 항목   | 내용                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상황   | • 본 쇼핑몰은 <b>`회원과 비회원이 모두`</b> 상품 주문을 할 수 있음.<br> • 쇼핑몰에 가입한 회원이 POST 요청을 통해 주문하는 경우만 고려하였음.<br>• orderRouter의 orderController 부분에서 customerId를 처리하는 중 로그인 체크 미들웨어를 거쳐서 바로 req.Id로 값을 할당하였음.                                                                                                                                                                    |
| 문제   | • 따라서 <b>`비회원은 토큰이 없어서 주문 처리가 되지 않는 문제가 발생`</b>하였음.                                                                                                                                                                                                                                                                                                                                                                  |
| 해결   | • orderController에서 주문 추가를 담당하는 postOrder 함수를 분기처리하여 회원과 비회원을 구분함.<br>- <b>`회원`</b> : 토큰에서 유저 Id를 확인하여 customerId를 할당<br>- <b>`비회원`</b> : 숫자를 랜덤생성하는 함수를 활용하여 customerId를 할당 (ex.guest_1646056800000_1234)<br>• 이를 통해 회원과 비회원이 모두 동일한 서비스를 경험할 수 있으며, <b>`데이터베이스에서는 회원과 비회원을 구분하여 효율적으로 주문내역을 관리`</b>할 수 있게 됨. |
| 느낀점 | • 사전에 로그인을 해야하는 서비스와 그렇지 않은 서비스를 구분하여 로직을 설계하는 것이 중요하다고 느낌.                                                                                                                                                                                                                                                                                                                                            |

<details>
<summary><i>회원과 비회원을 구분하는 주문 내역 처리 - controller/orderController.js</i></summary>
<div markdown="1">

![이슈해결코드](https://github.com/TripTeller-repository/TripTeller_BE/assets/127278410/89c38b39-4a54-42e8-8718-065591196814)

</div>
</details>
<br>

### 2. 안정적인 서버 이미지 로딩 보장

| 항목   | 내용                                                                                                                                                                                          |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상황   | • 프론트엔드에서 서버에 저장된 이미지 파일을 불러올 때, 실제 파일이 있는지 확인하는 여부를 체크하는 로직이 없음.                                                                              |
| 문제   | • 프론트엔드에서 서버의 URL은 잘 로드되지만 <b>`실제 파일은 존재하지 않아 이미지 렌더링 문제`</b>가 발생하였음.                                                                               |
| 해결   | • 서버에서 <b>`특정 경로에 이미지가 있는지 확인`</b>하여 유효한 이미지만 로드되도록 하는 유틸리티를 작성함.<br>• 이미지 URL이 유효하지 않은 경우 프론트엔드는 기본 정적 파일을 표시하도록 함. |
| 느낀점 | • 프로그래밍에서 <b>`예외 상황을 처리`</b>하는 것이 중요하다고 생각함.                                                                                                                        |

<details>
<summary><i>이미지 존재 여부 확인 - misc/profileImageUtils.js</i></summary>
<div markdown="1">

```
const path = require('path');
const fs = require('fs/promises');

async function getProfileImageUrl(profileImageUrl) {
  const folderpath = path.join('src', 'public');
  const imagePath = path.join(folderpath, profileImageUrl);

  try {
    // 이미지 경로가 유효하면 해당 url 반환
    await fs.access(imagePath);
    return profileImageUrl;
  } catch (error) {
    // 그렇지 않으면 빈 문자열 반환
    console.error(`Error accessing profile image`, error);
    return '';
  }
}

module.exports = getProfileImageUrl;
```

</div>
</details>
<br>

### 3. 이미지 업로드 제한 및 압축을 통한 서버 효율성 향상

| 항목   | 내용                                                                                                                                                                                                                                                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 상황   | • multer로 이미지처리 시 <b>`업로드 가능한 이미지 용량을 제한하지 않음.`</b>                                                                                                                                                                                                                                                               |
| 문제   | • 큰 이미지를 업로드하면 서버 부하와 디스크 사용량이 늘어남.<br>• ex) 10MB 이미지는 10MB의 서버 저장공간을 그대로 소비함.                                                                                                                                                                                                                  |
| 해결   | • <b>서버</b><br>- 이미지 용량을 <b>`최대 1MB로 제한`</b>하였음.<br>- 파일 크기를 초과하면 적절한 에러 메시지를 보냄.<br>• <b>프론트엔드</b><br>- 업로드하기 전 이미지 최대 용량을 1MB로 설정함.<br>- 1MB를 초과하면 <b>`최대 너비 또는 높이를 70%로 줄여 압축`</b>함.<br>- 압축한 후에도 파일 크기가 1MB를 초과하면 업로드되지 않도록 함. |
| 느낀점 | • 서버 개발에서 비용과 시간을 모두 고려하여 효율적으로 로직을 구현해야할 필요성을 느낌.                                                                                                                                                                                                                                                    |

<details>
<summary><i>이미지 압축하여 업로드 (시연 GIF)</i> </summary>
<div markdown="1">

![이미지압축해서업로드](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/0c35dd5a-0abc-4b11-9d00-0c61aa37933d)

</div>
</details>
<details>
<summary><i>서버의 이미지 용량 제한 - misc/multerConfig.js</i></summary>
<div markdown="1">

```
const multer = require('multer');
const path = require('path');

class MulterConfig {
  constructor(uploadDir = './src/public/uploads', fieldName = 'profileImage') {
    this.uploadDir = uploadDir;
    this.fieldName = fieldName;
    this.storage = this.createStorage();
    // 단일 파일 업로드, 필드 이름은 'profileImage'
    // 최대 1MB 용량으로 제한
    this.upload = multer({
      storage: this.storage,
      limits: { filesize: 1 * 1024 * 1024 },
    }).single('profileImage');
  }

  createStorage() {
    return multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadDir);
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + '-' + Date.now() + path.extname(file.originalname),
        );
      },
    });
  }

  getUploadHandler() {
    return this.upload;
  }
}

module.exports = MulterConfig;
```

</div>
</details>
<details>
<summary><i>프론트엔드에서의 이미지 압축 - myPage.js</i></summary>
<div markdown="1">

```
// 이미지 압축
async function handleImageUpload(event) {
  const imageFile = event.target.files[0];
  console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
  console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 1, // 최대 용량 2MB
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    let compressedFile = await imageCompression(imageFile, options);

    if (compressedFile.size / 1024 / 1024 > 1) {
      const resizeOptions = {
        maxSizeMB: 1, // 최대 용량 1MB
        maxWidthOrHeight: 1920 * 0.7, // 70% 크기
        useWebWorker: true,
      };
      compressedFile = await imageCompression(imageFile, resizeOptions);
    }

    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    );
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    if (compressedFile.size / 1024 / 1024 <= 1) {
      await uploadToServer(compressedFile);
    } else {
      alert("프로필 이미지가 1MB를 초과하여 업로드할 수 없습니다.");
    }
  } catch (error) {
    console.log(error);
    alert("프로필 이미지 업로드 중 오류가 발생했습니다.");
  }
}
```

</div>
</details>

---

## 배포

### 배포 방법
#### 프론트엔드 배포

사전 세팅

- SSL 인증서로 CloudFront 설정

단계

1. master 브랜치에 푸시를 하면 Github Action이 실행됨.
2. Github Action에서 빌드 후 AWS S3 버킷에 파일을 업로드함.<br>
<i>(SPA 프레임워크가 아닌 프로젝트라서 a href와 window.location.href로 경로를 지정할 때 index.html로 정확히 지정해줘야 함.)</i>

#### 백엔드 배포

1. EC2 인스턴스 생성
2. HTTPS용 로드 밸런서(Elastic Load Balancer, ELB) 설정
3. EC2에 Node.js 및 PM2 설치
4. Github Action에 appleboy/ssh-action을 사용하여 EC2 접속
5. Github에서 소스코드를 가져옴.
6. npm i 후 Express 프로젝트를 빌드
7. pm2로 서버 코드 실행

### 후기
- AWS에서 임대해주는 가상 머신인 <b>`EC2 인스턴스`</b>에 프로젝트를 배포하였음. 
- EC2 인스턴스는 항상 켜져 있기 때문에 비용이 더 많이 들고, <b>`실제 사용량에 관계없이 예약된 리소스에 대한 비용을 지불`</b>하게 된다는 단점이 있었음.
- 이렇게 되면 사용량이 적어도 일정한 비용이 지속적으로 나가게 되므로 비효율적이라는 생각이 들었음.
- 이를 해결하기 위한 방법을 간단히 조사해보았더니 <b>`서버리스 컴퓨팅`</b>이 있음.
- 서버리스 컴퓨팅은 <b>`사용한 컴퓨팅 시간에 대해서만 비용을 청구`</b>하고 <b>`수요에 따라 자동으로 확장`</b>한다고 함. 필요할 때 필요한 만큼만 비용을 지불할 수 있어서 가상머신과 비교해보고 추후 프로젝트에 적용해보면 좋을 것 같음.

---

## 느낀점

- ### 1. 백엔드에서의 설계와 에러처리의 중요성을 실감함.

  - Node.js와 Express를 사용하여 진행한 첫 번째 웹 프로젝트이자 백엔드 프로젝트였기 때문에 초반에는 순탄하지 않았음. HTML, CSS, JavaScript와 같은 프론트엔드 기술을 위주로 학습한 것이 하나의 이유가 될 수 있음.
  - 비즈니스 로직을 인증/인가 유무에 따라 분류하지 않았기 때문에 코드를 크게 수정한 적이 있음. <b>`프로젝트 후반에 코드를 전면 수정하는 일을 최대한 없도록 예방하려면 초기에 다양한 시나리오를 예상하고 체계적으로 설계하는 것이 중요하다`</b>고 생각함.
  - 코드베이스가 늘어남에 따라 오류 수도 늘어났음. 이러한 오류는 내 코드의 문제를 추적하고 이해하는 데 큰 도움이 되었음.
  - 따라서 에러처리를 제대로 하는 것도 중요하다고 생각함.<br><b>`(적절한 위치에서의 정확한 에러코드와 메시지 전달)`</b>

- ### 2. 네트워킹에 대한 폭넓은 이해의 필요성을 느낌.

  - 코드 작성을 마치고 배포를 해야 했을 때, 네트워크에 대한 지식이 부족하여 어려움을 겪었음.
  - 일례로, 사용할 포트 번호(80 또는 3000)를 잘못 설정하는 것 같이 로드 밸런서를 설정하는 데 어려움이 있었음. 게다가 NS, CNAME, A 등 다양한 종류의 DNS 레코드가 익숙하지 않아 일일이 찾아봐야 했음.
  - <b>`배포 작업`</b> 중 시스템의 한 부분이 정확히 설정되지 않으면, 코드 작성과 달리 단순히 오류가 발생하는 것이 아니라는 것을 깨달음. <b>`전체 시스템이 작동하지 않아 문제를 식별하기 어려울 수 있음.`</b>
  - 이를 통해 <b>`배포 프로세스 중에 동기화 및 네트워킹 세부 사항에 세심한 주의를 기울이는 것이 중요하다`</b>는 사실을 배웠음.

- ### 결론

  - 전반적으로 이 프로젝트를 통해 백엔드 개발에서 신중한 계획과 견고한 디자인의 중요성을 배웠음.
  - 앞으로는 네트워킹에 대한 이해의 폭을 넓히고, 오류 처리 기술을 향상시키며, 시스템 설계 기술을 연마할 계획임.
  - 이러한 기초적인 경험은 향후 더욱 복잡하고 효율적인 프로젝트를 위한 기반을 마련함.
