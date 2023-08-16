'use client'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import {Swiper,SwiperSlide} from "swiper/react";
import SwiperCore, {Navigation, Pagination, Autoplay} from "swiper"
import Image from 'next/image';
import banner1 from 'public/banner1.png'
import banner2 from 'public/banner2.png'
import banner3 from 'public/banner3.png'
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react'
import { cocktailsFETCH } from '../api/route'

/** Swiper 속성들 
 * slidesPerView:1 //한 슬라이드에 보여줄 개수
 * spaceBetween:6 //슬라이스 사이의 여백
 * loop:false //슬라이드 반복 여부
 * loopAdditionalSlides:1 //슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드 보이지 않는 현상 수정
 * pagination:false //pager의 여부
 * autoplay:{delay:시간(ms), disableOnInteraction:false} //자동슬라이드 설정 (시간/스와이프 후 자동재생 비활성화 기능)
 * navigation:{nextEl:'swiper-button-next', prevEl:'swiper-button-prev'} //버튼 사용자 지정
 * freeMode:false //슬라이드 넘길 때 위치 고정 여부
 * autoHeigth:true //true라면 슬라이드 래퍼가 현재 활성 슬라이드에 높이에 맞춰 높이 조정
 * resistance:false //슬라이드 터치 저항 여부
 * slideToClickedSlide:true //해당 슬라이드 클릭 시 슬라이드 위치로 이동
 * centeredSlides:true //true시에 슬라이드가 가운데 배치
 * allowTouchMove:true //false면 스와이핑 금지. 버튼으로만 조작 가능
 * watchOverflow:true //슬라이드가 1개일 때 pager, button 숨김 여부
 * slidesOffsetBefore:{숫자} //슬라이드 시작부분 여백
 * slidesOffsetAfter:{숫자} //슬라이드 끝부분 여백
 * pagination:{
 *  el:'.pagination', //페이저 버튼 담을 태그
 *  clickable:'true', //버튼 클릭 여부
 *  type:'bullets', //버튼 모양. bullets와 fraction
 *  renderBullets:function(index, className){
 *      return <a href="#" class='' className=''>+(index+1)+</a>
 *  }
 *  renderFraction:...
 * }
*/


export function Banner(){ //Banner는 수동으로 입력... Banner map함수 쓰면 에러남. 이유는 모르겠음
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    /** 배너에 배치할 문구와 칵테일id를 입력하세요 */
    const banner_data = [
        {id:1, title:"모히또", body:'"모히또 가서 몰디브나 한 잔 하자"', link:5},
        {id:2, title:"쿠바 리브레", body:'라임의 새콤한 맛, 콜라의 단 맛이 만난 환상의 조합', link:3},
        {id:3, title:"블루 하와이", body:'하와이의 푸른 바다를 담은 대표적인 트로피칼 칵테일', link:1}
    ]
    return(
    <article className='home_article'>
        <Swiper
            className="banner"
            slidesPerView={1}
            centeredSlides={true} 
            navigation={true}
            pagination={{clickable:true}}
            autoplay={{delay:5000,disableOnInteraction:false}}
            loop = {true}
            freeMode={false}
            allowTouchMove={false}
        >    
            <SwiperSlide className='banner_Slide_item'>
                <span className='banner_text banner1'>
                    <h1>{banner_data[0].title}</h1>
                    <h3>{banner_data[0].body}</h3>    
                </span>
                <Link href={`/recipe/${banner_data[0].link}`}>view more</Link>
                <Image src={banner1} alt={banner_data[0].title}></Image>
            </SwiperSlide>
            <SwiperSlide className='banner_Slide_item'>
                <span className='banner_text banner2'>
                    <h1>{banner_data[1].title}</h1>
                    <h3>{banner_data[1].body}</h3>
                </span>
                <Link href={`/recipe/${banner_data[0].link}`}>view more</Link>
                <Image src={banner2} alt={banner_data[1].title}></Image>
            </SwiperSlide>
            <SwiperSlide className='banner_Slide_item'>
                <span className='banner_text banner3'>
                    <h1>{banner_data[2].title}</h1>
                    <h3>{banner_data[2].body}</h3>
                </span>
                <Link href={`/recipe/${banner_data[0].link}`}>view more</Link>
                <Image src={banner3} alt={banner_data[2].title}></Image>
            </SwiperSlide>
        </Swiper>
    </article>
    )
}
export function RecipePreview(){
    SwiperCore.use([Navigation, Pagination, Autoplay]);
    const [recipePreview, setRecipePreview] = useState([]);

    let random_num = [];
    for(let i=0; i<6; i++){
        const number = Math.floor(Math.random()*15); //데이터베이스 칵테일 개수
        if (random_num.indexOf(number) === -1){
            random_num.push(number);
        } else {i--}
    }
    useEffect(()=>{ //칵테일 데이터 가져온 뒤 슬라이드에 뿌리기
        let recipe_list = [];
        cocktailsFETCH('GET').then(resolve=>{
            random_num.map(random=>{
                recipe_list.push(
                    <SwiperSlide key={resolve[random].id} className='look_Slide_item'>
                        <Link href={`/recipe/${random+1}`}>
                            <Image src={`/cocktail/${random+1}.png`} alt={resolve[random].name} fill sizes='260' priority></Image>
                        </Link>
                        <div className='look_Slide_text'>
                            <Link href={`/recipe/${random+1}`}><h3>{resolve[random].name}</h3></Link>
                            <h4>{resolve[random].comment}</h4>
                        </div>
                    </SwiperSlide>
                )
            }); setRecipePreview(recipe_list)});
    },[]);
    return (<article className='home_article'>
        <div className='article_text'>
            <h2>다양한 칵테일 레시피 둘러보기</h2>
        </div>
        <Swiper
            slidesPerView={3.8}
            navigation={true}
            allowTouchMove={true}
            spaceBetween={50}
            loop = {false}
            className="look_slide"
        >
            {recipePreview}
        </Swiper>
    </article>)
}
export function CustomPreview(){
    SwiperCore.use([Navigation]);
    return(<article className='home_article article_custom_container'>
        <div className="article_text">
            <h2>가장 인기있는 커스텀 레시피 TOP 3</h2>
            <h3>유저들이 직접 뽑은 최고의 레시피</h3>
        </div>
        <div className='article_custom'>
            <div className='article_custom_item'>
                <Image src={'/cocktail/6.png'} fill sizes='340' alt='custom1 descript'></Image>
            </div>
            <div className='article_custom_item'>
                <Image src={'/cocktail/7.png'} fill sizes='340' alt='custom2 descript'></Image>
            </div>
            <div className='article_custom_item'>
                <Image src={'/cocktail/8.png'} fill sizes='340' alt='custom3 descript'></Image>
            </div>
        </div>
        <Link className='article_custom_button' href={'/custom-recipe'}>더 보러가기</Link>
    </article>)
}
export function MyBagPreview(){
    const blurURL = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
    const sliderSetting = {slidesOffsetBefore:100, slidesOffsetAfter:100, spaceBetween:30, //슬라이드 여백
    autoplay:{delay:0, disableOnInteraction:false}, loop:true, loopAdditionalSlides:3,
    slidesPerView:5, allowTouchMove:false}
    SwiperCore.use([Autoplay]);

    const [baseList, setBaseList] = useState([]);
    const [bodyList, setBodyList] = useState([]);
    const [garnishList, setGarnishList] = useState([]);
    
    useEffect(()=>{
        
    },[])

    return(<article className='home_article'>
        <div className='article_text'>
            <h2>냉장고를 열어보세요</h2>
            <h3 className='mt-4'>칵테일을 만들기 위한 재료가 준비되셨나요?</h3>
        </div>
        <div className='article_material_slide'>
            {/* 주재료 슬라이드 */}
            <Swiper dir='ltr' className='h-52 mybag_preview1' speed={2700} {...sliderSetting}>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/2.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/3.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/4.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/6.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/5.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/7.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/1.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
            </Swiper>
            {/* 부재료 슬라이드 */}
            <Swiper dir='rtl' className='h-52 mybag_preview2 my-10' speed={3750} {...sliderSetting}>    
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/8.png'} alt={''} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/9.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/10.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/1.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/11.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/12.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/13.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
            </Swiper>
            {/* 기타 재료 슬라이드 */}
            <Swiper dir='ltr' className='h-52 mybag_preview3' speed={3600} {...sliderSetting}>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/14.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/3.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/15.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/3.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/5.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/11.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
                <SwiperSlide className='material_slide_item'>
                    <Image sizes='232' src={'/cocktail/8.png'} alt='' fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                </SwiperSlide>
            </Swiper>
        </div>
    </article>)
}