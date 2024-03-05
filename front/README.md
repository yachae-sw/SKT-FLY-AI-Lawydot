# Lawydot Front-end

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>

## Front-end start

In the project directory, you can run:

### `npm i`

1. 의존성 설치: npm i 명령어는 프로젝트의 package.json 파일에 명시된 종속성(dependencies)을 설치합니다.\
   이는 프로젝트가 의존하는 라이브러리나 패키지를 다운로드하고 설치하는 과정을 포함합니다.

2. 의존성 해결: npm은 package.json 파일에 명시된 각 종속성이 필요로 하는 다른 패키지도 자동으로 설치합니다.\
   이 과정은 종속성 트리(dependency tree)를 따라가면서 필요한 모든 패키지를 설치하는 것을 의미합니다.

3. 로컬 설치: npm i는 종속성을 로컬로 설치합니다. 이는 프로젝트 폴더 내에 node_modules라는 디렉토리에 패키지를 설치하고 관리합니다.\
   이로써 각 프로젝트가 자체적인 종속성을 가지고 있으며, 다른 프로젝트와의 충돌을 방지할 수 있습니다.

### `yarn start`

- 개발 모드에서 앱을 실행합니다.\
   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어보세요.

- 변경 사항을 만들 때마다 페이지가 다시로드됩니다.\
   콘솔에서 린트(lint) 오류를 확인할 수도 있습니다.

## Front-end 구조

```
├── README.md
├── .gitignore
├── package-lock.json
├── package.json
├── yarn.lock
│
├── node_modules
│
├── public
│    └── index.html
│
└── src
     ├── App.js
     ├── index.css
     ├── index.js
     ├── utils
     │     └── APIRoutes.js
     │
     ├── assets
     │     ├── analytics_icon.svg
     │     ├── chatbot_icon.svg
     │     ├── files_icon.svg
     │     └── lawydot_logo.png
     │          .
     │          .
     │          .
     ├── components
     │     ├── ChatContainer.jsx
     │     ├── ChatInput.jsx
     │     ├── Contacts.jsx
     │     ├── Logout.jsx
     │     ├── PostItem.jsx
     │     ├── SetAvatar.jsx
     │     └── Welcometothe.jsx
     │
     └── pages
           ├── Chat.jsx
           ├── Checklist.jsx
           ├── Lawyer.jsx
           ├── Login.jsx
           ├── PostDetail.jsx
           └── Register.jsx


```

<br>

## 페이지 구성

### [Log-in]

- 서비스 접속 초기화면으로 Log-in 화면이 나타납니다.
  - 로그인이 되어 있지 않은 경우 : 로그인 페이지
  - 로그인이 되어 있는 경우 : Lawydot 홈 화면
  - 가입이 되어 있지 않은 경우 : CREATE ONE 부분을 누르면 Sign-up 페이지로 이동
- SNS(카카오톡, 구글, 페이스북) 로그인 기능은 구현되어 있지 않습니다.

| Log-in                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- |
| ![Log-in](https://github.com/yachae-sw/SKT-FLY-AI-Lawydot/assets/93850398/4716cc9b-ba83-4135-8ef2-b574c204787a) |

<br>
