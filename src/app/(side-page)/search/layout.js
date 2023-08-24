'use client'
import React, { useCallback, useState } from 'react';
import {BiSearch} from "react-icons/bi";
import {FaSearch} from "react-icons/fa";
import Link from 'next/link'
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchLayout({children}){
    return(
        <div>
            <Filter></Filter>
            {children}
        </div>
    )
}



export function Filter(){
    // //지울때 초기화 버튼을 넣을지 아니면 직접 지우도록 할지
    const router = useRouter();


    //검색창에 입력했을 때
    const [search, setSearch] = useState(''); 
    const handleText=(e)=> setSearch(e.target.value)

    //엔터를 눌렀을 때
    const enterSearch = (e) => {
      if (e.key === 'Enter'){
        searchSomething();      
    }};
    

    // 검색하기
    const searchSomething = async () =>{
      var before=encodeURIComponent(search) // 검색어만 encode 

      router.push(`/search/${before}`)

    //   router.push({
    //     pathname: `/search/${search}`,
    //     // query: {search: search},
    // })

    // console.log(pathname)
    // <Link>/recipe+string</Link>
    };
    // const searchSomething = () => {
      // router.push('/search'+ '/' + createQueryString(search))
      // router.push('/search'+"?"+createQueryString("keyword",search))
      // console.log(pathname+"path")
      // console.log(createQueryString(search)+"Params")
    // }
  



// https://kream.co.kr/search?keyword=%ED%8C%A8%EB%94%A9
    // const createQueryString = useCallback(
/*       (search_)=>{
        const params = search_
        return params.toString()
      },[searchParams]
 */
      // (keyword, search_)=>{
        // const params = new URLSearchParams(searchParams)
/*        const params = new URLSearchParams()
        params.set(keyword,search_)
        console.log(params)
        return params.toString()
      },[searchParams]
    )*/

    return(<>

    <div className='layout_container'>
    <div className='layout_box'>
        <div className='layout_txt_container'>
        <Link href={`/search`} className='layout_txt_1'>CockTell</Link>
        <Link href={`/search`} className='layout_txt_2'>칵테일을 말하다</Link>
        </div>
        <div className='layout_search_bar'>

        <input type="text" placeholder="칵테일 이름을 입력해보세요" onChange={handleText} onKeyDown={enterSearch} className="layout_search_input"></input>
        <BiSearch className='layout_search_icon' onClick={searchSomething}/>

        </div>
        <div className='layout_remain_container'>
        <div className="layout_remain_box">
        {/* <h2 className='layout_txt_3'>최근 검색어</h2> */}
        {/* <FaSearch className='layout_just_icon' /> */}
        </div>
        </div>

    </div>
    </div>

      </>
    )
}