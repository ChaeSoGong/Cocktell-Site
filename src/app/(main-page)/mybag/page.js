import { testFETCH } from "@/app/api/route"

export default async function MyBag() {
  const data = {"users":[{email:"hi"}]};
  testFETCH('POST', data);
  //const cocktailData = await testFETCH("GET");
  //const newData = cocktailData["users"]; //데이터베이스에서 "users" 선택
  //cocktailData["users"].filter((data)=>{data.key>3})
  //const newDATA = newData.filter(data=>data.age>'2010-11');
  //console.log(newDATA);
    return (
      <div>
      </div>
    )
  }