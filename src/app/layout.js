import './globals.css'
import Link from 'next/link'
import {BiSearchAlt2} from "react-icons/bi";
import {BiSolidCalculator} from "react-icons/bi";

//Import Client Component
import Header from './(client-component)/header.js' //Header Component

export const metadata = {
  title: 'CockTell 칵텔',
  description: 'Created By Chaeyun Lim, Sohyeon Jang',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header></Header> {/** Developed by 임채윤 - Header is Client Component */}
        <Nav></Nav> {/** Developed by 장소현 - Nav is Server Component */}
        <main>
          {children} {/** This is Page Component */}
        </main>
        <Footer></Footer> {/** Developed by 장소현 - Footer is Server Component */}
      </body>
    </html>
  )
}
function Nav(){ //Developed by 장소현
  /* logo , menu, subMenu 나눠져 잇어야 함 */
  return (
    <nav>
      <div className="nav">
        <div className='left_nav'>
          <div className='nav_logo'>
            <Link href="/" className='nav_log_text'>CockTell</Link>
          </div>
          <div className='nav_menu'>
            <Link href="/recipe" className='nav_menu_item'>Recipe</Link>
            <Link href="/custom-recipe" className='nav_menu_item'>Custom</Link>
            <Link href="/mybag" className='nav_menu_item'>My Bag</Link>
          </div>
        </div>
        <div className='nav_subMenu'>
          <Link href="/search" className='nav_subMenu_item'><BiSearchAlt2/></Link>
          <Link href="/calculator" className='nav_subMenu_item'><BiSolidCalculator/></Link>
{/*           <div className='nav_subMenu_item_menu'>
            M
            <div className="dropdown_item">
                <Link href="/ranking">사용자 랭킹</Link>
                <Link href="/community">커뮤니티</Link>
                <Link href="/notice">공지사항</Link>
                <Link href="/support">문의사항</Link>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  )
}
function Footer(){ //Developed by
  return(
    <footer>
      <div className='footer_container'>
        <div className='footer_item'>
          <Link href="/notice"><h5>공지사항</h5></Link>
          <Link href="/support"><h5>문의사항</h5></Link>
        </div>
        <div className='footer_item'>
          <Link href={"https://github.com/Jang-SoHyeon"}><h5>장소현 : https://github.com/Jang-SoHyeon</h5></Link>
          <Link href={'https://github.com/ChaeDoll'}><h5>임채윤 : https://github.com/ChaeDoll</h5></Link>
        </div>
        <h5 className='footer_item'>* 경고 : 지나친 음주는 뇌졸중, 기억력 손상이나 치매를 유발합니다. 임신 중 음주는 기형아 출생 위험을 높입니다.</h5>
      </div>
    </footer>
  )
}
