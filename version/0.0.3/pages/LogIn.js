import React from "react";
import {Link, useNavigate} from 'react-router-dom';

/** 로그인 페이지 구현 : 장소현 */
export function LogIn(props) {
    const navigate = useNavigate();
    return (
        <div className="box">
        <div className="loginPage">
            <form> 
                <div className="login_logo">
                <div className="login_txt">CockTell</div>
                <div className="login_subtxt">칵테일을 말하다</div>
                </div>
                <div className="login_input">
                    <div className="user_input_txt">이메일 주소</div>
                    <input type="email" placeholder="cocktell12@gmail.com" id ="user_email" className="user_input_box"/>
                    <div className="user_input_txt">비밀번호</div>
                    <input type="password" id="user_password" className="user_input_box"/>

                    <input type="checkbox" id="stay_logged_in"className="user_input_chekcBox"/>
                    <label for="stay_logged_in"  className="user_input_chekcBox_txt"> 로그인 상태 유지</label>
                </div>
                    
                

                    <input type="submit" value="로그인" id="login" className="login_button" onClick={event=>{
                        event.preventDefault();
                        props.state(true);
                        navigate("/");
                        alert("로그인됐다");
                    }}/>

                 {/* 로그인 예외 사항   */}
                <Link to="/findpassword" className='login_except'>비밀번호 찾기</Link>
                <Link to="/signup" className='login_except'>회원가입</Link>

                
            </form>

        </div>
        </div>
    
    );
};