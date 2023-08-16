//Client Component에서 use라는 Hook을 사용하여 fetch메소드들을 사용할 수 있다.

/** usersFETCH('요청방식','입력할 데이터 or 선택할 데이터 id') return Promise
 *  사용시에는 then을 사용하여 Promise를 resolve하여 사용하면 된다.
 * 
 * 첫 번째 인자(request)에는 GET, POST, PUT(입력), PATCH, DELETE 등 요청을 입력한다.  
 * 두 번째 인자(response)는 users에 데이터를 입력하거나 선택하기 위한 것이다.
 * POST에서는 입력,수정할 데이터를 json방식으로 받고, GET과 DELETE는 선택할 id를 받을 수 있다.
 * (POST에서는 입력받을 body, DELETE에서는 삭제할 데이터의 id)
 */
export async function usersFETCH(request , response=''){
    const link = `http://localhost:9999/users/${response}`; //입력받은 id를 선택한다
    const method = request;

    if (method === "GET"){
        const res = await fetch(link);
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리
            console.log('Successful GET Fetch users data!');
            return await res.json(); //fetch 성공 시 users data 반환
        } else{
            console.log('Server message : Failed GET users data fetch!!!');
            return {message : 'Failed data fetch'}; //fetch 실패 시 실패메세지 반환
        }
    }
    else if (method === 'POST'){
        const res = await fetch('http://localhost:9999/users/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        });
        if (res.ok){ //201 : 성공적으로 요청되어 서버가 새로운 소스를 작성완료
            console.log('Successful POST Fetch users data!');
            return await res.json();
        } else{
            console.log('Server message : Failed POST users data fetch!!!');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'DELETE'){
        const res = await fetch(link, {
            method:'DELETE',
        });
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리하여 삭제함
            console.log('Successful DELETE fetch users data!');
            return await res.json();
        } else{
            console.log('Server Message : Failed DELETE users data fetch!!');
            return {message : 'Failed data fetch'};
        }
    }
}

export async function cocktailsFETCH(request , response=''){
    const link = `http://localhost:9999/cocktails/${response}`; //입력받은 id를 선택한다
    const method = request;

    if (method === "GET"){
        const res = await fetch(link);
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리
            console.log('Successful GET Fetch users data!');
            return await res.json(); //fetch 성공 시 cocktails data 반환
        } else{
            console.log('Server message : Failed GET cocktails data fetch!!!');
            return {message : 'Failed data fetch'}; //fetch 실패 시 실패메세지 반환
        }
    }
    else if (method === 'POST'){
        const res = await fetch('http://localhost:9999/cocktails/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        });
        if (res.ok){ //201 : 성공적으로 요청되어 서버가 새로운 소스를 작성완료
            console.log('Successful POST Fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server message : Failed POST cocktails data fetch!!!');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'PATCH'){ //수정하고 싶은 데이터의 내용을 response에 넣음 (수정 필요)
        const res = await fetch(link,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        })
        if (res.ok){
            console.log("Successful PATCH Fetch cocktail data!");
            return await res.json();
        } else{
            console.log('Server message : Failed PATCH cocktail data fetch');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'DELETE'){
        const res = await fetch(link, {
            method:'DELETE',
        });
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리하여 삭제함
            console.log('Successful DELETE fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server Message : Failed DELETE cocktails data fetch!!');
            return {message : 'Failed data fetch'};
        }
    }
}


//ingredients fetch
export async function ingredientsFETCH(request , response=''){
    const link = `http://localhost:9999/ingredients/${response}`; //입력받은 id를 선택한다
    const method = request;

    if (method === "GET"){
        const res = await fetch(link);
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리
            console.log('Successful GET Fetch users data!');
            return await res.json(); //fetch 성공 시 cocktails data 반환
        } else{
            console.log('Server message : Failed GET cocktails data fetch!!!');
            return {message : 'Failed data fetch'}; //fetch 실패 시 실패메세지 반환
        }
    }
    else if (method === 'POST'){
        const res = await fetch('http://localhost:9999/cocktails/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        });
        if (res.ok){ //201 : 성공적으로 요청되어 서버가 새로운 소스를 작성완료
            console.log('Successful POST Fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server message : Failed POST cocktails data fetch!!!');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'PATCH'){ //수정하고 싶은 데이터의 내용을 response에 넣음 (수정 필요)
        const res = await fetch(link,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        })
        if (res.ok){
            console.log("Successful PATCH Fetch cocktail data!");
            return await res.json();
        } else{
            console.log('Server message : Failed PATCH cocktail data fetch');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'DELETE'){
        const res = await fetch(link, {
            method:'DELETE',
        });
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리하여 삭제함
            console.log('Successful DELETE fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server Message : Failed DELETE cocktails data fetch!!');
            return {message : 'Failed data fetch'};
        }
    }
}


/** 
 * const res = await fetch(url, {
*  method : 전송방식, //GET*, POST, PUT, DELETE etc
*  mode : 모드, //cors*, no-cors, same-origin
*  cache : 캐싱, //default*, no-cache, reload, force-cache, only-if-cached
*  credentials : //same-origin*, include, omit
*  headers : {
*      "Content-Type" : "application/json"
*  },
*  redirect : //follow*, manual, error
*  referrerPolicy : //no-referrer-when-downgrade*, no-referrer, origin,
*  origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
*  body : JSON.stringify(data), //headers에서 적은 타입의 데이터를 실을 수 있다. json타입이니 data엔 json이 들어가야함 
* });
*
* 이후 나중에 res.json()으로 json response를 Javascript Object로 변환한다
*/


/** Open AI API (Chat GPT API) 
 *  const response = await openai.listEngines(); Chat GPT 엔진 리스트 출력
*/

/* import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-2KZP6FdqHDKrqwJiosAY0hce",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);


const runGPT = async (prompt) => {
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });
    console.log(response.data.choices[0].message.content);
};

runGPT("how can you learn English");
*/

/* export async function testFETCH(request , response=''){
    const link = `https://chaesogong.github.io/cocktell-database/db.json`; //입력받은 id를 선택한다
    const method = request;

    if (method === "GET"){
        const res = await fetch(link);
        if (res.ok){ //200 : 성공적으로 서버가 요청을 처리
            console.log('Successful GET Fetch users data!');
            return await res.json(); //fetch 성공 시 cocktails data 반환
        } else{
            console.log('Server message : Failed GET cocktails data fetch!!!');
            return {message : 'Failed data fetch'}; //fetch 실패 시 실패메세지 반환
        }
    }
    else if (method === 'POST'){
        const res = await fetch('https://chaesogong.github.io/cocktell-database/db.json', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        });
        if (res.ok){ //201 : 성공적으로 요청되어 서버가 새로운 소스를 작성완료
            console.log('Successful POST Fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server message : Failed POST cocktails data fetch!!!');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'PATCH'){ //수정하고 싶은 데이터의 내용을 response에 넣음 (수정 필요)
        const res = await fetch(link,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(response)
        })
        if (res.ok){
            console.log("Successful PATCH Fetch cocktail data!");
            return await res.json();
        } else{
            console.log('Server message : Failed PATCH cocktail data fetch');
            return {message : 'Failed data fetch'}
        }
    }
    else if (method === 'DELETE'){
        const res = await fetch(link, {
            method:'DELETE',
        });
        if (res.status === 200){ //200 : 성공적으로 서버가 요청을 처리하여 삭제함
            console.log('Successful DELETE fetch cocktails data!');
            return await res.json();
        } else{
            console.log('Server Message : Failed DELETE cocktails data fetch!!');
            return {message : 'Failed data fetch'};
        }
    }
} */