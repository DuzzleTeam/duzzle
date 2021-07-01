# 폴더 구조
- public
  - images
    - 공통 이미지
    - 페이지 종속 이미지
- src
  - _actions
  - _reducers
  - components
    - 여러 곳 사용 컴포넌트
    - views
      - 페이지 별 컴포넌트
  - hoc
  - hooks
  - utils
  - App.js
- package.json

---

## public
프론트엔드에서 사용되는 static 파일들

### images
프론트엔드에서 사용되는 이미지들
- 여러 페이지에서 사용되는 이미지
- 하나의 페이지에서만 사용되는 이미지 (페이지 별 폴더 구분)

---

## src
실제 프론트엔드 화면 구성 컴포넌트 소스들

### _actions
- post_action.js   
새 게시물 작성   
피드 업데이트   
- user_action.js   
회원가입 인증   
로그인   
회원가입   
회원정보   
회원정보 수정   
유저 정보   
- types.js   
action 타입 상수들   

### _reducers
- index.js   
root reducer   
- post_reducer.js
- user_reducer.js

### components
- Feed   
게시글 목록   
- Loading   
무한 회전 로딩   
- Pagination   
페이지네이션   
- Preview   
게시글 보기, 작성에서 이미지 프리뷰   
- **views**   
  - 각종 페이지 별 폴더   
    - Sections   
      - css   
      - 페이지 종속 컴포넌트   

### hoc
로그인 여부 관련 접근 제한

### hooks
custom hooks

### utils
공통 적용 css   
공통 함수   
SNS 관련 정보   

### App.js

---

## package.json
프론트엔드에서 필요한 의존성
