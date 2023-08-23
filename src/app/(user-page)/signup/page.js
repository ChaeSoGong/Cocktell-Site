'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react"
export default function SignUp() {
  const [userData, setUserData] = useState([]);
  /* useEffect(()=>{ //Server에서 Users Data를 Client에 가져오기
    const usersClientFETCH = async() => {
        try{
            await setUserData(await usersFETCH('GET'));
        }catch(error){
            console.log('Client message : Failed Data Fetch!!')
        }
    }
    usersClientFETCH();
    return(()=>{setUserData(null)}); //페이지를 나갈 때 유저데이터 기록 삭제
},[]) */

  /** useRef()를 통해 유효성 검사를 통과하지 못했을시, 해당 input 태그로 focus 자동이동 */
  const router = useRouter();
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordConfirmInput = useRef();
  const nicknameInput = useRef();
  const ageInput = useRef();

  const [email, setEmail] = useState(""); //이메일 입력
  const [emailMessage, setEmailMessage] = useState("예) abcd@gmail.com");
  const onEmailChange = (e) =>{
    setEmail(e.target.value);
  }
  const [password, setPassword] = useState(""); //비밀번호 입력
  const [passwordMessage, setPasswordMessage] = useState("숫자+영문자+특수문자 조합으로 8글자 이상 입력하세요");
  const onPasswordChange = (e) =>{
    setPassword(e.target.value);
  }
  const [passwordConfirm, setPasswordConfirm] = useState(""); //비밀번호 확인 입력
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("비밀번호를 재입력하세요");
  const onPasswordConfirmChange = (e) =>{
    setPasswordConfirm(e.target.value);
  }
  const [nickname, setNickname] = useState(""); //닉네임 입력
  const [nicknameMessage, setNicknameMessage] = useState("2~8글자의 닉네임을 입력하세요");
  const [nicknamePass, setNicknamePass] = useState(false);
  const [nicknameCheck, setNicknameCheck] = useState('');
  const onNicknameChange = (e) =>{
    setNickname(e.target.value);
  }
  const [age, setAge] = useState(""); //나이 입력
  const [gender, setGender] = useState(false); //성별 선택 (false:남자, true:여자)
  const onGenderChange = (e) =>{
    console.log(e.target.value)
    if (gender===false) {
      setGender(true);
    }
    else if (gender===true){
      setGender(false);
    }
  }

  return (
    <div className="signup_page">
      <div className="signup_box">
        <h1 className="signup_logo">Sign Up</h1>
        <form className="signup_container" onSubmit={ async (event)=>{
          event.preventDefault();

          /** 유효성 검사 
           * 1. 이메일을 작성하였는가
           * 2. 비밀번호를 작성하였는가
           * 3. 비밀번호와 비밀번호 확인이 일치하는가
           * 4. 닉네임을 작성하였는가
           * 5. 닉네임이 2~8글자를 만족하는가
           * 6. 닉네임 중복확인을 마쳤는가 (이 과정에서 동일한 닉네임이 있는지 확인이 필요)
           * 7. 체크박스를 모두 체크하였는가
          */
          if(email===''){ //이메일 작성 여부 확인
            setEmailMessage("이메일을 입력하세요.");
            emailInput.current.focus();
            return alert('이메일을 입력하세요');
          }

          const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/; //안전 비밀번호 정규식
          if(password===''){ //비밀번호 작성 여부 확인
            setPasswordMessage("비밀번호를 입력하세요.");
            passwordInput.current.focus();
            return alert('비밀번호를 작성하세요');
          } else if (!passwordRegExp.test(password)) {
            setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력하세요!");
            passwordInput.current.focus();
            setPassword("");
            setPasswordConfirm("");
            return alert('안전하지 않은 비밀번호입니다');
          }
          if(password !== passwordConfirm){ //비밀번호와 비밀번호 확인이 일치하는지
            setPasswordConfirmMessage("비밀번호와 일치하지 않습니다.");
            passwordConfirmInput.current.focus();
            setPassword("");
            setPasswordConfirm("");
            return alert('비밀번호와 비밀번호 확인이 일치하지 않습니다')
          }
          if(nickname!==nicknameCheck){ //닉네임 중복확인 여부 확인
            setNicknameCheck(false); //만약 확인받은 닉네임과 현재 작성된 닉네임이 다르면 다시 체크받게 함
            nicknameInput.current.focus();
            return alert('닉네임 중복확인을 해주세요');
          } else if(nicknamePass !== true){ //최종적인 승인
            nicknameInput.current.focus();
            return alert('닉네임 중복확인을 해주세요')
          }
          if(age===""){
            ageInput.current.focus();
            return alert('나이를 선택하세요');
          }

          /** 입력받은 데이터들을 묶어서 Server DB에 전송 */
          const users = {
            email:email,
            password:password,
            nickname:nickname,
            age:age,
            gender:gender, //false(남자), true(여자)
          }
          /* usersFETCH('POST', users).then(resolve=>{
            console.log('user값을 받았습니다 =>',resolve);
            alert(`회원가입이 성공적으로 이루어졌습니다. 환영합니다 ${resolve.nickname}님`)
          });
          router.push({ //회원가입이 완료되면 로그인 페이지로 자동 안내
            pathname:'/signup',
            cache:'no-store',
          });
          router.refresh(); */
          }
        }>
          <div className="signup_item">
            <h3>이메일 주소</h3>
            <input className="signup_text_box" type="email" placeholder={emailMessage} value={email} onChange={onEmailChange} ref={emailInput}/>
          </div>
          <div className="signup_item">
            <h3>비밀번호</h3>
            <input className="signup_text_box" type="password" placeholder={passwordMessage} value={password} onChange={onPasswordChange} ref={passwordInput}/>
          </div>
          <div className="signup_item">
            <h3>비밀번호 확인</h3>
            <input className="signup_text_box" type="password" placeholder={passwordConfirmMessage} value={passwordConfirm} onChange={onPasswordConfirmChange} ref={passwordConfirmInput}/>
          </div>
          <div className="signup_item">
            <div className="signup_item_item1">
              <h3>닉네임</h3>
              <input className="signup_text_box" type="text" placeholder={nicknameMessage} value={nickname} onChange={onNicknameChange} ref={nicknameInput}/>
            </div>
            <input className="signup_item_item1 signup_nickname_check" type="button" value={'중복확인'} onClick={()=>{
              if (JSON.stringify(userData, ['nickname']).indexOf(nickname)>-1){
                if(nickname==='') {
                  setNicknamePass(false);
                  nicknameInput.current.focus();
                  return alert('닉네임을 입력해주세요');
                }
                console.log('This Nickname is Already Joinned');
                setNicknamePass(false);
                nicknameInput.current.focus();
                return alert('이미 존재하는 닉네임입니다');
              } else if (nickname.length<2||nickname.length>8){
                setNicknamePass(false);
                nicknameInput.current.focus();
                console.log('Nickname must be 2~8 word');
                return alert('잘못된 닉네임입니다')
              }
              else if (JSON.stringify(userData, ['nickname']).indexOf(nickname)===-1){
                setNicknamePass(true);
                setNicknameCheck(nickname);
                console.log('Good nickname');
                return alert('사용 가능한 닉네임입니다.');
              }
            }}/>
          </div>
          <div className="signup_item">
            <div className="signup_item_item2">
              <h3>연령</h3>
              <input className="signup_date" value={age} type="month" onChange={(e)=>{ //나이 입력
                setAge(e.target.value);
              }} min={'1930-01'} max={'2010-12'} ref={ageInput}/>
            </div>
            <div className="signup_item_item2">
              <h3>성별</h3>
              <label className="signup_gender">
                <input type="checkbox" value={gender} onClick={onGenderChange}/>
                <span className="signup_gender_item">
                  <div>남자</div>
                  <div>여자</div>
                </span>
              </label>
            </div>
          </div>
          <div className="signup_item">
            <label className="signup_checkbox">
              <input type="checkbox"/>
              <span>[필수] 만 14세 이상이며, 이용약관에 동의합니다.</span>
            </label>
            <label className="signup_checkbox">
              <input type="checkbox"/>
              <span>[필수] 마케팅을 위한 개인정보 활용에 동의합니다.</span>
            </label>
          </div> 
          <input className="signup_button" type="submit" value='회원가입'/>
        </form>
      </div>
    </div>
  )
}