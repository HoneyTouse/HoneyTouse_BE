# 🐝꿀단집 BackEnd Repository

> <b>"당신의 감성을 흔드는 인테리어 꿀템이 가득한 꿀단집"</b>

> "특별한 감성을 담은 소품과 가구를 원하는 당신을 위한 꿀템이 가득!
저희 꿀단집에서 만나보세요.” 🍯🏠

> 📌 <b>HoneyTouse URL</b> : http://honeytouseclient.s3-website.ap-northeast-2.amazonaws.com/<br>
> 📌 <b>HoneyTouse ReadMe</b> : https://github.com/HoneyTouse<br>
> 📌 <b>HoneyTouse BackEnd Github</b> : https://github.com/HoneyTouse/HoneyTouse_BE

![리드미최상단](https://github.com/HoneyTouse/HoneyTouse_BE/assets/127278410/6374c883-fad2-40ad-bec2-01fcf71cac01)

---

## 🔷 바로가기

- [프로젝트 개요](#프로젝트-개요)<br>
- [프로젝트 아키텍쳐](#프로젝트-아키텍쳐)<br>
- [구현 내용](#구현-내용)<br>
- [이슈 해결](#이슈-해결)<br>
- [배포전략](#배포전략)<br>
- [프로젝트 성찰](#프로젝트-성찰)<br>

---

## 프로젝트 개요<br>

- ### 기간 및 방식 <br>

  #### <b>기간</b>

  - <span>1차</span> : 기획 및 개발 (24.04.01 ~ 24.04.19) <i>[3주]</i><br>

  - <span>2차</span> : 리팩토링 (24.06.01 ~24.06.15) <i>[자율]</i><br>

  #### <b>진행 방식</b>

  | 구분 | 방식과 내용                                                                                                                                                                                                                                    |
  | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
  | 1차  | • <b>방식</b> : 프론트엔드와 백엔드 담당자가 일정 기간 동안 함께 개발을 진행<br> • <b>위치</b> : (주)엘리스가 보유하고 있는 프라이빗 GitLab 저장소<br> • <b>내용</b> : 인증 기능을 갖춘 기본 CRUD API 개발                             |
  | 2차  | • <b>방식</b> : 필요에 따라 특정 부분을 담당하는 팀원끼리 소통하여 추가적인 개발을 진행함.<br> • <b>위치</b> : 자율적으로 생성한 Github Organization<br> • <b>내용</b> : 간단히 쓰세용 |

  <br>

- ### 인원 및 역할 <br>

  - 백엔드 3명<br>

  | 이름   | 담당 업무                                                                                                                                                                                                 |
  | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | 문채영 | • DailyPlan, DailySchedule, Expense, TravelLog 스키마 및 API 생성<br> • POSTMAN 및 Thunder Client로 API 테스트 후, 노션으로 문서화 진행 
  | 이가린 | • User, Authentication, Feed, Scrap, Search 스키마 및 API 생성<br> • Swagger 작성, 클라이언트 및 서버 자동 배포<br> • NestJS에서 제공하는 기능 활용(필터, 로거, 가드, 파이프, 미들웨어) 설정, 인증 고도화 |
  | 최정민 | • DailyPlan, DailySchedule, Expense, TravelLog 스키마 및 API 생성<br> • POSTMAN 및 Thunder Client로 API 테스트 후, 노션으로 문서화 진행                                                                   |

    <br>

- ### 기술스택 <br>

  - <b>백엔드</b> : Node.js, Express, MongoDB, JavaScript, JWT
  - <b>배포</b> : AWS S3, Route53, Cloudfront, EC2
  - <b>기타</b> : multer S3

| 기술           | 선정 이유                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <b>NestJS</b>  | • NestJS는 Express의 높은 자유도에 비해 <u>설계 부담을 크게 줄이는 구조화된 모듈식 아키텍처</u> 때문에 채택함. <br> • 또한 종속성 주입, 직관적인 CLI, TypeScript 지원 등 다양한 기능이 있어서 개발자의 편의를 돕는 다양한 기능을 제공함.                                                                                                                                                            |
| <b>MongoDB</b> | • MongoDB의 유연한 스키마 구조는 대규모 데이터를 분산처리하는 데 이상적이지만 본 프로젝트에서는 대용량 데이터를 특별히 다루고 있지는 않음.<br>• 그러나 스키마 변경이 되어도 큰 문제가 발생하지 않는 <u>유연한 데이터 모델링이 가능</u>한 mongoDB의 특성을 활용함.<br> • 이 결정은 프로젝트의 상호 연결된 CRUD 작업으로 인해 설계 단계에서 스키마 조정이 필요할 수 있다는 점을 염두하여 내려진 것임. |
| <b>JWT</b>     | • stateless(상태 비저장) 인증인 JWT는 서버 로드를 줄이고 인증 프로세스 속도를 높임.                                                                                                                                                                                                                                                                                                                 |
| <b>AWS</b>     | • AWS에서 웹 애플리케이션 호스팅 및 배포의 거의 모든 측면을 포괄하는 <u>광범위한 서비스</u>를 제공하며, <u>대량의 트래픽 처리</u>를 쉽게 할 수 있도록 설계되어 활용함.                                                                                                                                                                                                                              |

<br>

- ### 개발환경 <br>

  - Node.js : v20.9.0<br>
  - Mongoose : ^8.3.1<br>
  - express : ^10.0.0<br>

- ### 라이브러리 <br>

  - eslint, prettier, nodemon, bcrypt, cors, dotenv, ejs, express, jsonwebtoken, mongoose, nodemailer, swagger-ui-express, yaml, passport, multer

---

## 프로젝트 아키텍쳐<br>

### 전체 프로젝트 구조


<br>
<br>

### 백엔드 폴더 구조
<details>
<summary>폴더별 기능 설명</summary>
<div markdown="1">

이미지 넣으세요

</div>
</details>

### MongoDB 스키마


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

> - Refresh Token과 Access Token을 활용한 JWT 기반 로그인 전략 구현
> - AWS Presigned URL을 활용한 이미지 업로드 처리
> - MongoDB의 가상 속성 및 페이징을 사용
> - 정렬, 검색 및 필터링 기능을 갖춘 데이터 관리
> - dotenv를 사용해 실행 환경에 따라 환경 변수를 다르게 설정
> - 리퀘스트와 에러를 Winston Logger로 로깅 처리

---

## 이슈 해결

---

## 배포 전략

---

## 프로젝트 성찰
