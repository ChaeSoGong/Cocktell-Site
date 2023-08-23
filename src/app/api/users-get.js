import { TOKEN, USERS_DATABASE_ID } from '@/config';

/** 제작자 : 임채윤 - Notion API를 사용하여 Notion에 저장된 Users DB를 가져오는 api.
 * 사용하고자 하는 위치에서 import 하여 사용하면 List의 형태로 유저 데이터를 반환한다. */

/** --------- S O R T I N G ---------**Develop By 임채윤**  
 * 
 * 정렬 혹은 필터링을 하여 Users Data를 가져올 수 있습니다.  
 * *(주의 사항 : 정렬기준을 넣는다면 반드시 sort 혹은 reverse를 함께 입력해주세요)*  
 * method("sort", "정렬기준") : 오름차순 정렬 (Default)  
 * method("reverse", "정렬기준") : 내림차순 정렬  
 * 
 * 정렬기준 : "state" (접속상태), "nickname" (닉네임; Default), "age" (나이), "gender" (성별), "joindate" (가입일자)
 */
export async function getUsersData(action = null, config = null) {
  //Default 상태 : 닉네임 기준으로 오름차순 정렬
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-06-28',
      'Content-type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    }
  }

  //Default : 아무런 인자값이 없을 경우 닉네임 기준 오름차순 정렬
  let listDirection = action ? action : "ascending"; //Default 정렬값은 오름차순
  let listProperty = config ? config : "nickname"; //Default 기준값은 닉네임

  //Sorting : Users Data들을 오름차순으로 정렬
  if (action === "sort") {
    console.log("Server Message : Get Sorted Users Data...");
    listDirection = "ascending";
  }
  //Reverse Sorting : Users Data들을 내림차순으로 정렬
  else if (action === "reverse") { 
    console.log("Server Message : Get Reverse Sorted Users Data...");
    listDirection = "descending";
  }
  else {
    console.log("Server Message : Get Users Data...");
  }


  //설정된 값들로 정렬
  options.body = JSON.stringify({
    page_size: 100,
    sorts : [{
      "direction" : listDirection,
      "property" : listProperty,
  }]});
  const res = await fetch(`https://api.notion.com/v1/databases/${USERS_DATABASE_ID}/query`, options);
  if (!res.ok) {
    throw new Error("데이터 가져오기 실패");
  }
  const data = await res.json()
  const userList = data.results.map((user) => ({
    id: user.properties.id.formula.string,
    state: user.properties.state.status.name,
    email: user.properties.email.title[0].plain_text,
    nickname: user.properties.nickname.rich_text[0].plain_text,
    password: user.properties.password.rich_text[0].plain_text,
    age: user.properties.age.date.start,
    gender: user.properties.gender.select.name,
    joindate: user.properties.joindate.created_time
  }));
  return userList;
}