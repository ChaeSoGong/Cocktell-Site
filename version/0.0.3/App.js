import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {Routes, Route, Link, NavLink, useNavigate} from 'react-router-dom';
import Home,{SignUp,Community, Notice, Ranking, Support, FindPassword, LogIn, MyPage, Recipe, MyBag, Search, Calculator, Menu, Custom} from './pages';
import {BiSearchAlt2} from "react-icons/bi";
import {BiSolidCalculator} from "react-icons/bi";
import {RiMenuLine} from "react-icons/ri";

// import axios from 'axios';
// import DataRequest from './DataRequest';

function App() {
  // const [host, setHost] = useState("");
  // const _getHost = async() => {
  //   const res = await axios.get('/api/host');
  //   setHost(res.data.host);
  // }
  // useEffect(()=>{ //처음 실행될 때, 서버 설정
  //   _getHost();
  // },[]);
  
  let [loginStatus, setLoginStatus] = useState(false);
  let [content, setContent] = useState('HOME');
  return (
      <div className='App'>
        {/* {host} */}
        <Header login={loginStatus} setLogin={setLoginStatus}></Header>
        <Nav></Nav>
        <div className='main'>
        <Main login={loginStatus} setLogin={setLoginStatus} content={[content,setContent]} className='main'></Main>
        </div>
        <Footer></Footer>
      </div>
  );
};
function Header(props) {
  const headerContent = [];
  if (props.login===false) { /** 로그인 상태가 false라면... */
    headerContent.push(<div className='header_item'>
    <Link to='/login' className='header_text'>로그인</Link>
    <div className='line'>|</div>
    <Link to='/signup' className='header_text'>회원가입</Link>
    </div>)
  } else if (props.login===true) { /** 로그인 상태가 true라면... */
    headerContent.push(<div className='header_item'>
    <Link to='/mypage' className='header_text'>마이페이지</Link>
    <div className='line'>|</div>
    <Link to='/' className='header_text' onClick={()=>{
      alert("로그아웃 되었습니다");
      props.setLogin(false);
    }}>로그아웃</Link>
    </div>)
  }
  return (
    <div className='header_container'>{headerContent}</div>
  ); 
};

function Nav(props){
  /* logo , menu, subMenu 나눠져 잇어야 함 */
  return (<>
    <div className="nav">
      <div className='left_nav'>
        <div className='nav_logo'>
          <Link to="/" className='nav_log_text'>CockTell</Link>
        </div>
        <div className='nav_menu'>
          <Link to="/recipe" className='nav_menu_item'>Recipe</Link>
          <Link to="/custom" className='nav_menu_item'>Custom</Link>
          <Link to="/mybag" className='nav_menu_item'>My Bag</Link>
        </div>
        </div>
        <div className='right'>
        <div className='nav_subMenu'>
          <Link to="/search" className='nav_subMenu_item'><BiSearchAlt2/></Link>
          <Link to="/calculator" className='nav_subMenu_item'><BiSolidCalculator/></Link>
          <view className='nav_subMenu_item_menu'>
            <RiMenuLine/>
            <div class="dropdown_item">
                <Link to="/ranking">사용자 랭킹</Link>
                <Link to="/community">커뮤니티</Link>
                <Link to="/notice">공지사항</Link>
                <Link to="/support">문의사항</Link>
            </div>
          </view>
        </div>

      </div>
    </div>
  </>)
}
function Main(props){ /** 페이지를 띄우는 컴포넌트이다. */
  return (<div className='main'>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/login" element={<LogIn state={props.setLogin}/>}></Route> 
      <Route path="/signup" element={<SignUp/>}></Route> 
      <Route path="/mypage" element={<MyPage/>}></Route> 
      <Route path="/recipe" element={<Recipe/>}></Route> 
      <Route path="/custom" element={<Custom/>}></Route> 
      <Route path="/mybag" element={<MyBag/>}></Route> 
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/calculator" element={<Calculator/>}></Route>
      <Route path="/findpassword" element={<FindPassword/>}></Route>
      <Route path="/ranking" element={<Ranking/>}></Route>
      <Route path="/community" element={<Community/>}></Route>
      <Route path="/notice" element={<Notice/>}></Route>
      <Route path="/support" element={<Support/>}></Route>
    </Routes>
    </div>)
}
function Footer(props){
  return(
    <footer className='footer'>
      <div className='footer_line'></div>
      footer를 표현합니다
      * 경고 : 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 임신 중 음주는 기형아 출생 위험을 높입니다.
    </footer>
  )
}
export default App;
