'use client'

import Link from "next/link";


/** 로그인 페이지 구현 : 장소현 */
export default function LogIn(props) {
    return (
        <div className="box">
        <div className="loginPage">
            <form> 
                <div className="login_logo">
                <h1 className="login_txt">CockTell</h1>
                <h1 className="login_subtxt">칵테일을 말하다</h1>
                </div>
                <div className="login_input">
                    <h3 className="user_input_txt">이메일 주소</h3>
                    <input type="email" placeholder="cocktell12@gmail.com" id ="user_email" className="user_input_box"/>
                    <h3 className="user_input_txt">비밀번호</h3>
                    <input type="password" id="user_password" className="user_input_box"/>

                    <input type="checkbox" id="stay_logged_in"className="user_input_chekcBox"/>
                    <label for="stay_logged_in"  className="user_input_chekcBox_txt"> 로그인 상태 유지</label>
                </div>
                    
                

                    <input type="submit" value="로그인" id="login" className="login_button" />

                 {/* 로그인 예외 사항   */}
                <Link href="/findpassword" className='login_except'>비밀번호 찾기</Link>
                <Link href="/signup" className='login_except'>회원가입</Link>

                
            </form>

        </div>
        </div>
    
    );
};