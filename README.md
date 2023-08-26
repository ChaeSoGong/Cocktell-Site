## 개발
- 명지대학교 ICT융합대학에서 열리는 SW경진대회에 참여하기 위한 팀 프로젝트
- 멤버 
    - 개발자 : 임채윤, 장소현
    - 디자인 도움 : 김동환
- 사용 언어 : Next.js (풀스택 개발)
- 사용 데이터베이스 : Notion API (https://www.notion.so/CockTell-DataBase-d0118987948a4e8c883822e12d0dd60b)

## 프로젝트 실행방법
1. node.js가 설치되어 있는 터미널을 준비한 뒤 프로젝트 파일 내부에 접근한다.
2. npm install을 입력하여 next.js를 포함한 라이브러리들을 다운로드 한다.
3. npm run dev (혹은 npm run build -> npm run start) 명령어로 프로젝트를 시작한다.
4. http://localhost:3000 를 주소창에 입력하여 프로젝트에 칵텔(CockTell)에 접근한다.

## json Server 여는 방법
npx json-server --port 9999 --watch db.json
