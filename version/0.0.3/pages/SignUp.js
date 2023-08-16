import React, { useState } from "react";
import { Navigate } from "react-router-dom";
// import axios from 'axios';


/** 회원가입 페이지 구현 : 임채윤*/
export function SignUp(props) {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        //버튼 눌렀을 때 새로고침 방지
        event.preventDefault();

        if (password !== confirmPassword){
            return alert("비밀번호가 비밀번호 확인과 일치하지 않습니다.");
        }

        // axios
        //     .post("/api/users/signup", {
        //         email:email,
        //         nickname:nickname,
        //         password:password,
        //         confirmPassword:confirmPassword,
        //     }).then(res=>console.log(res));
    }
    return (
        <div className="signup_page">
            <div className="signup_box">
                <div className="signup_logo">Sign Up</div>
                <form className="signup_container" onSubmit={onSubmitHandler}>
                    <div className="signup_item">
                        <div>이메일 주소</div>
                        <input className="signup_text_box" type="email" placeholder="예) abcde@gmail.com"
                        value={email} onChange={onEmailHandler}/>
                    </div>
                    <div className="signup_item">
                        <div>비밀번호</div>
                        <input className="signup_text_box" type="password" placeholder="비밀번호를 입력하세요"
                        value={password} onChange={onPasswordHandler}/>
                    </div>
                    <div className="signup_item">
                        <div>비밀번호 확인</div>
                        <input className="signup_text_box" type="password" placeholder="비밀번호를 재입력하세요"
                        value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                    </div>
                    <div className="signup_item">
                        <div className="signup_item_item1">
                            <div>닉네임</div>
                            <input className="signup_text_box" type="text" placeholder="닉네임을 입력하세요"
                            value={nickname} onChange={onNicknameHandler}/>  
                        </div>
                        <input className="signup_item_item1 signup_duplicate_check" type="submit" value={'중복확인'} onClick={(event)=>{
                            event.preventDefault();
                        }}/>
                    </div>
                    <div className="signup_item">
                        <div className="signup_item_item2">
                            <div>연령</div>
                            <input className="signup_input_box" type="date"/>  
                        </div>
                        <div className="signup_item_item2">
                            <div>성별</div>
                            <label className="signup_input_box gender_switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>

                            <input className="signup_input_box" type="checkbox"/>
                        </div>
                    </div>
                    <div className="signup_item">
                        <label>
                            <input className="signup_checkbox" type="checkbox"/> [필수] 개인정보 활용 동의
                        </label>
                        <label>
                            <input className="signup_checkbox" type="checkbox"/> [필수] 개인정보 활용 동의
                        </label>
                    </div>
                    <input className="signup_button" type="submit" value='가입하기'/>
                </form>
            </div>
        </div>
    );
};