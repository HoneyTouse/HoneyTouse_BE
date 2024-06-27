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
  | 2차  | • <b>방식</b> : 필요에 따라 특정 부분을 담당하는 팀원끼리 소통하여 추가적인 개발을 진행함.<br> • <b>위치</b> : 자율적으로 생성한 Github Organization<br> • <b>내용</b> : 추가적으로 필요한 부분<i>(이미지 처리 방식, https를 적용한 배포 등)</i>, 불필요한 코드 제거<i>(ex. adminMiddleware와 loginMiddleware의 기능이 중복 등)</i>                     |

  <br>

- ### 인원 및 역할 <br>

  - 백엔드 3명<br>

  | 이름   | 역할                                                                                                                                                                                         |
  | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 문채영 | • Admin <i>(관리자 기능)</i> API 작성<br>• Order <i>(회원/비회원 주문 CRUD)</i> API 작성                                                                  |
  | 이가린 | • User <i>(인증/인가, 개인정보 CRUD)</i> API 작성<br> • 클라이언트 및 서버 자동 배포<br> |
  | 최정민 | • Category <i>(카테고리 CRUD)</i> 작성<br>• Product <i>(상품 CRUD)</i> API 작성<br>                                                                   |
  - 공통 : POSTMAN 및 Thunder Client로 API 테스트 후, 노션으로 문서화
    <br>

- ### 기술스택 <br>

  - <b>백엔드</b> : Node.js, Express, MongoDB, JavaScript, JWT
  - <b>배포</b> : AWS S3, Route53, Cloudfront, EC2
  - <b>기타</b> : multer S3

| 기술           | 선정 이유                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>Express</b>  | • 설명                                                                                                                                                   |
| <b>MongoDB</b> | • 설명 |
| <b>JWT</b>     | • stateless(상태 비저장) 인증인 JWT는 서버 로드를 줄이고 인증 프로세스 속도를 높임.                                                                                                                                                                                                                                                                                                                 |
| <b>AWS</b>     | • AWS에서 웹 애플리케이션 호스팅 및 배포의 거의 모든 측면을 포괄하는 <u>광범위한 서비스</u>를 제공하며, <u>대량의 트래픽 처리</u>를 쉽게 할 수 있도록 설계되어 활용함.                                                                                                                                                                                                                              |


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

> - Multer 미들웨어를 활용한 이미지 업로드 처리
> - Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현
> - Passport를 활용한 구글 로그인 구현
<br>

### 1. Multer 미들웨어를 활용한 이미지 업로드 처리

### 2. Nodemailer 및 TTL(Time-To-Live)을 사용하여 이메일 인증을 구현

### 3. Passport를 활용한 구글 로그인 구현

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

