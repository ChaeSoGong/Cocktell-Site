import Image from 'next/image'

// 데이터 전체 가져오기

export default async function Result(props){
    //띄어쓰기는 문자 구분

    const searchKey = props.params.result //검색어 여기에 들어감
    console.log(searchKey+"에 대한 결과")
    const options = { //여기에 검색어를 사용한 필터링 사용 ("property":"name","")
        "filter":{"property":"name","title":{"contains":searchKey}}
    }
    const cocktailPromise = await fetch('http://localhost:3000/api/allcocktaildata',{
        method:'POST', headers:{'Content-Type':"application/json"},
        body:JSON.stringify(options)
    })
    const cocktailList = await cocktailPromise.json();
    console.log(cocktailList);//[]
    return(
        <div>
            {`'${props.params.result}' 에 대한 검색결과`}
            {/* $`로 해야된대` */}
        </div>
    )
}