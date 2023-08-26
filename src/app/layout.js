import './globals.css'
import Link from 'next/link'
import { BiSearchAlt2 } from "react-icons/bi";
import { BiSolidCalculator } from "react-icons/bi";
import { noto_sans, playfair_display, diphylleia } from './fonts'
import Header from './(client-component)/header.js' //Header Component

export const metadata = {
  title: 'CockTell 칵텔',
  description: 'Created By Chaeyun Lim, Sohyeon Jang',
}

export default function RootLayout({ children }) {
  return (
    <html className={noto_sans.className}> {/** 얘 이름만 바꾸면 폰트 변경 */}
      <body>
        <Header></Header> {/** Developed by 임채윤 - Header is Client Component */}
        <Nav font={playfair_display}></Nav> {/** Developed by 장소현 - Nav is Server Component */}
        <main>
          {children} {/** This is Page Component */}
        </main>
        <Footer font={playfair_display}></Footer> {/** Developed by 장소현 - Footer is Server Component */}
      </body>
    </html>
  )
}

function Nav(props) { //Developed by 장소현
  /* logo , menu, subMenu 나눠져 잇어야 함 */
  return (
    <nav className={props.font.className}>
      <div className="nav">
        <div className='left_nav'>
          <div className='nav_logo'>
            <Link href="/" className='nav_logo_text'>CockTell</Link>
          </div>
          <div className='nav_menu'>
            <Link href="/recipe" className='nav_menu_item'>Recipe</Link>
            <Link href="/custom" className='nav_menu_item'>Custom</Link>
            <Link href="/mybag" className='nav_menu_item'>My Bag</Link>
          </div>
        </div>
        <div className='nav_subMenu'>
          <Link href="/search" className='nav_subMenu_item'><BiSearchAlt2 /></Link>
          <Link href="/calculator" className='nav_subMenu_item'><BiSolidCalculator /></Link>
        </div>
      </div>
    </nav>
  )
}
function Footer(props) { //Developed by 장소현
  return (
    <footer className={props.font.className}>
      <div className='footer_container'>
        <div className='footer_items'>
          <span className='footer_item_1_box'><Link href="/notice"><h5 className="footer_item_1">공지사항</h5></Link></span>
          <span className='footer_item_1_box'><Link href="/support"><h5 className="footer_item_1">문의사항</h5></Link></span>
        </div>
        <div className='footer_item'>
          <div className='footer_item_2_box'>
          <span><h5 className='footer_item_2'>개발한 사람들</h5></span>
          <span><Link href={"https://github.com/Jang-SoHyeon"}><h5>장소현  https://github.com/Jang-SoHyeon</h5></Link></span>
          </div>
          <div className='footer_item_2_box'>
          <span><h5 className='footer_item_2_box_no'>개발한 사람들</h5></span>
          <span><Link href={'https://github.com/ChaeDoll'}><h5>임채윤  https://github.com/ChaeDoll</h5></Link></span>
          </div>
        </div>
        <div className='footer_item_3_box'>
        <h3 className='footer_item_3'>칵테일을 말하다</h3>
        <h2 className='footer_item_3_logo'>CockTell</h2>
        <h3>© 2023. by ChaeSoGong. All rights are reserved.</h3>
        </div>
      </div>
    </footer>
  )
}
