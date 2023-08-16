'use client'

import { usersFETCH } from '@/app/api/route';
import { useState, useEffect, use, useLayoutEffect, useRef } from 'react';
export default function UserManage() {
    const [userData, setUserData] = useState([]);
    useEffect(()=>{ //Server에서 Users Data를 Client에 가져오기
        const usersClientFETCH = async() => {
            try{
                await setUserData(await usersFETCH('GET'));
            }catch(error){
                console.log('Client message : Failed Data Fetch!!')
            }
        }
        usersClientFETCH();
        return(()=>{setUserData(null)}); //페이지를 나갈 때 유저데이터 기록 삭제
    },[])
    const [content, setContent] = useState(<div>입력된 정보가 없습니다</div>);
    useEffect(()=>{
        setContent(userData.map((user)=>{
            return(
                <div className='user-manage-item' key={user.id} style={{
                    border:"1px solid green",
                }}>
                    {'이메일 : '+user.email}<br/>
                    {'비밀번호 : '+user.password}<br/>
                    {'닉네임 : '+user.nickname}<br/>
                </div>
            )
        }))
    },[userData]);
    return (
      <div className='user-manage'>
        {content}
      </div>
    );
};

/* .map(user=>{
    return (
        <div className='user-manage-item' key={user.id}>
            {'이메일 : '+user.email}<br/>
            {'비밀번호 : '+user.password}<br/>
            {'닉네임 : '+user.nickname}<br/>
            <input type='button' value='수정' user={user}></input>
        </div>                
    )
}) */