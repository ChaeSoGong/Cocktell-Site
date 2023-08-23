'use client'

import Link from "next/link";
import { useEffect, useState } from "react"

export default function Header(){ //Developed by 임채윤
    
    const [login, setLogin] = useState(false);
    const [headerContent, setHeaderContent] = useState(null);
    const router = useRouter();
    useEffect(()=>{ //첫 실행 때와 Login State가 변경될 때에 실행
        if(login === true){ //login === true
            setHeaderContent(
                <div className="header_container">
                    <div className='header_item'>
                        <Link href={'/mypage'}>마이페이지</Link>
                    </div>
                    <div className='header_item_line'>|</div>
                    <div className='header_item'>
                        <input type="button" value={'로그아웃'} onClick={()=>{
                            console.log('Button has Pressed');
                            setLogin(false);
                            router.push('/');
                            router.refresh();
                            alert('로그아웃 되었습니다');
                        }}/>
                    </div>
                </div>
            )
        }
        else{ //login === false
            setHeaderContent(
                <div className="header_container">
                    <div className='header_item'>
                        <Link href={'/login'}>로그인</Link>
                    </div>
                    <div className='header_item_line'>|</div>
                    <div className='header_item'>
                        <Link href={'/signup'}>회원가입</Link>
                    </div>
                </div>
            )
        }
    },[login])
    return(
        <header>
            {headerContent}
        </header>
    )
}