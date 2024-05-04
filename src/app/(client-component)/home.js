'use client'
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper"
import Image from 'next/image';
import banner1 from 'public/banner1.png'
import banner2 from 'public/banner2.png'
import banner3 from 'public/banner3.png'
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react'
import { blurURL } from '@/config'
import { AiOutlineSwapRight } from 'react-icons/ai'
import { diphylleia } from '../fonts'

export default function Home(props) {
    //props.data내에 recipeData, customData, materialData 가 들어감
    const observe = useRef();
    useEffect(() => { //Fade In / Fade Out 기능
        observe.current = new IntersectionObserver((e) => {
            e.forEach(article => {
                if (article.isIntersecting) { //감시중인 박스가 나타날 때..
                    article.target.style.opacity = 1;
                } else { //감시중인 박스가 사라질 때...
                    article.target.style.opacity = 0;
                }
            })
        })
        document.querySelectorAll('article').forEach((article) => { observe.current.observe(article) })
    }, []);
    return (
        <>
            <div className="mt-32"></div>
            <Banner />
            <div className="mt-52 mb-40 border-b border-gray-300"></div>
            <RecipePreview recipeData={props.data?.recipe} />
            <div className="mt-40 mb-40 border-b border-gray-300"></div>
            <CustomPreview customData={props.data?.custom} />
            <div className="mt-40 mb-40 border-b border-gray-300"></div>
            <MyBagPreview materialData={props.data?.material} />
            <div className="mt-40 mb-40 border-b border-gray-300"></div>
            <CocktellAI></CocktellAI>
        </>
    )
}
function Banner() { //Banner는 수동으로 입력... Banner map함수 쓰면 에러남. 이유는 모르겠음
    SwiperCore.use([Navigation, Pagination, Autoplay]);

    /** 배너에 배치할 문구와 칵테일id를 입력하세요 */
    const banner_data = [
        { id: 1, title: "모히또", body: '"모히또 가서 몰디브나 한 잔 하자"', link: 35 },
        { id: 2, title: "쿠바 리브레", body: '라임의 새콤한 맛, 콜라의 단 맛이 만난 환상의 조합', link: 36 },
        { id: 3, title: "블루 하와이", body: '하와이의 푸른 바다를 담은 대표적인 트로피칼 칵테일', link: 38 }
    ]
    return (
        <article className={`${diphylleia.className} home_article`}>
            <Swiper
                className="banner"
                slidesPerView={1}
                centeredSlides={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                freeMode={false}
                allowTouchMove={false}
            >
                <SwiperSlide className='banner_Slide_item'>
                    <span className='banner_text banner2'>
                        <h1>{banner_data[1].title}</h1>
                        <h3>{banner_data[1].body}</h3>
                    </span>
                    <Link href={`/recipe/${banner_data[1].link}`}>view more</Link>
                    <Image src={banner2} alt={banner_data[1].title}></Image>
                </SwiperSlide>
                <SwiperSlide className='banner_Slide_item'>
                    <span className='banner_text banner3'>
                        <h1>{banner_data[2].title}</h1>
                        <h3>{banner_data[2].body}</h3>
                    </span>
                    <Link href={`/recipe/${banner_data[2].link}`}>view more</Link>
                    <Image src={banner3} alt={banner_data[2].title}></Image>
                </SwiperSlide>
                <SwiperSlide className='banner_Slide_item'>
                    <span className='banner_text banner1'>
                        <h1>{banner_data[0].title}</h1>
                        <h3>{banner_data[0].body}</h3>
                    </span>
                    <Link href={`/recipe/${banner_data[0].link}`}>view more</Link>
                    <Image src={banner1} alt={banner_data[0].title}></Image>
                </SwiperSlide>
            </Swiper>
        </article>
    )
}
function RecipePreview(props) {
    SwiperCore.use([Navigation, Pagination, Autoplay]);
    const content = props.recipeData?.map((recipe) => {
        return (
            <SwiperSlide key={recipe.id} className='look_Slide_item'>
                <Link href={`/recipe/${recipe.id}`}>
                    <img src={recipe.image} alt={recipe.name} fill='true' loading="lazy" sizes='260'></img>
                </Link>
                <div className='look_Slide_text'>
                    <Link href={`/recipe/${recipe.id}`}><h3>{recipe.name}</h3></Link>
                    <h4>{recipe.comment}</h4>
                </div>
            </SwiperSlide>
        )
    })
    return (<article className='home_article'>
        <div className='article_text'>
            <h2>다양한 칵테일 레시피 둘러보기</h2>
        </div>
        <Swiper
            slidesPerView={3.8}
            navigation={true}
            allowTouchMove={true}
            spaceBetween={50}
            loop={false}
            className="look_slide"
        >
            {content}
        </Swiper>
    </article>)
}
function CustomPreview(props) {
    const content = props.customData?.map((item) => (
        <div key={item.id} className='article_custom_item'>
            <img src={item.image} fill="true" loading="lazy" sizes='320' alt={item.name}></img>
        </div>
    ))
    SwiperCore.use([Navigation]);
    return (<article className='home_article article_custom_container'>
        <div className="article_text">
            <h2>가장 인기있는 커스텀 레시피 TOP 3</h2>
            <h3>유저들이 직접 뽑은 최고의 레시피</h3>
        </div>
        <div className='article_custom'>
            {content}
        </div>
        <Link className='article_custom_button' href={'/custom'}>
            <span className='article_custom_button_text'>더 보러가기</span><span className='text-4xl font-thin pl-5'><AiOutlineSwapRight /></span>
        </Link>
    </article>)
}
function MyBagPreview(props) {
    const sliderSetting = {
        slidesOffsetBefore: 100, slidesOffsetAfter: 100, spaceBetween: 30, //슬라이드 여백
        autoplay: { delay: 0, disableOnInteraction: false }, loop: true, loopAdditionalSlides: 3,
        slidesPerView: 5, allowTouchMove: false
    }
    SwiperCore.use([Autoplay]);
    const mainMaterial = props.materialData.filter((item) => (item.type === 'mainmaterial'))
    const subMaterial = props.materialData.filter((item) => (item.type === 'submaterial'))
    const garnishMaterial = props.materialData.filter((item) => (item.type === 'garnish'))
    return (<article className='home_article'>
        <div className='article_text'>
            <h2>냉장고에 있는 재료로 찾는 칵테일 레시피</h2>
            <h3 className='mt-4'>My Bag에서 자세한 정보를 확인해보세요</h3>
        </div>
        <Link href={'/mybag'}>
            <div className='article_material_slide'>
                {/* 주재료 슬라이드 */}
                <Swiper dir='ltr' className='mybag_preview1' speed={2700} {...sliderSetting}>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[6].image} alt={mainMaterial[6].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[4].image} alt={mainMaterial[4].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[2].image} alt={mainMaterial[2].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[3].image} alt={mainMaterial[3].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[1].image} alt={mainMaterial[1].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[5].image} alt={mainMaterial[5].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={mainMaterial[7].image} alt={mainMaterial[6].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                </Swiper>
                {/* 부재료 슬라이드 */}
                <Swiper dir='rtl' className='mybag_preview2 my-10' speed={3750} {...sliderSetting}>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[8].image} alt={subMaterial[8].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[7].image} alt={subMaterial[7].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[9].image} alt={subMaterial[9].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[10].image} alt={subMaterial[10].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[4].image} alt={subMaterial[4].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[5].image} alt={subMaterial[5].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={subMaterial[6].image} alt={subMaterial[6].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                </Swiper>
                {/* 기타 재료 슬라이드 */}
                <Swiper dir='ltr' className='mybag_preview3' speed={3600} {...sliderSetting}>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[0].image} alt={garnishMaterial[0].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[8].image} alt={garnishMaterial[8].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[2].image} alt={garnishMaterial[2].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[3].image} alt={garnishMaterial[3].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[4].image} alt={garnishMaterial[4].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[5].image} alt={garnishMaterial[5].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                    <SwiperSlide className='material_slide_item'>
                        <Image sizes='232' src={garnishMaterial[7].image} alt={garnishMaterial[7].name} fill={true} placeholder='blur' blurDataURL={blurURL}></Image>
                    </SwiperSlide>
                </Swiper>
            </div>
        </Link>
    </article>)
}
function CocktellAI() {
    const [order, setOrder] = useState("");
    const [result, setResult] = useState([]);
    const [aiResultContent, setAiResultContent] = useState(<></>);
    const onOrderChange = (e) => {
        setOrder(e.target.value);
    }
    const onEnterDown = (e) => { //엔터 치면 질문하기 버튼 클릭한 것과 동일함
        if (e.key === 'Enter') {
            onOrderSubmit(e);
        }
    }
    const onOrderSubmit = async (e) => {
        e.preventDefault();
        if (order === "") { return alert("기분에 값을 입력해주세요"); }
        const dataPromise = await fetch('/api/cocktellai', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                order: order,
            })
        }); //택배요청
        const dataList = await dataPromise.json(); //택배풀기
        const resultList = [dataList.answer.recommendCocktail, dataList.answer.description]
        setResult(resultList); //질문을 하면 답변이 담기고, 담긴 답변이 배열로 담김
    }
    useEffect(() => {
        if (result.length !== 0) {
            setAiResultContent(
                <div className='ai_result_box'>
                    <h2 className='ai_result_text'>당신의 기분에 맞는 칵테일이 도착했습니다</h2>
                    <h1 className='ai_result_name'>{result[0]}</h1>
                    <h3 className='ai_result_description'>{result[1]}</h3>
                </div>
            )
        }
    }, [result])

    return (
        <article className='home_article'>
            <div className='article_ai_container'>
                <div className='article_text_ai'>
                    <h2>당신만의 특별한 칵테일</h2>
                    <h3>기분에 맞는 칵테일을 Cocktell AI에게 물어보세요</h3>
                </div>
                <div className='article_ai_content_box'>
                    <h2 className='text-5xl font-[600] mt-20 mb-14'>오늘의 기분은 어떠신가요?</h2>
                    <form onSubmit={onOrderSubmit} onKeyDown={onEnterDown} className='flex flex-col items-center article_ai_form'>
                        <input className='article_ai_input' placeholder='당신의 기분을 입력하세요' value={order} onChange={onOrderChange} size={35}></input>
                        <input className='article_ai_submit' type='submit' value={'답변하기'}></input>
                    </form>
                    {aiResultContent}
                </div>
            </div>
        </article>
    )
}