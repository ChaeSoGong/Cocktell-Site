import {Swiper,SwiperSlide,} from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
// import "swiper/components/pagination/pagination.min.css";
import SwiperCore, {Navigation} from "swiper"
import {useRef} from 'react'
import {AiOutlineArrowLeft} from "react-icons/ai";


export default function Home() {
    SwiperCore.use([Navigation]);

    return(
        <div>
        <Swiper
        slidesPerView={1}
        centeredSlides={true}
        navigation={true}
        allowTouchMove={false}
        autoplay={{true:1}}
        loop = {true}
        loopAdditionalSlides={1}
        className="banner"
        freeMode={false}
        >
            <SwiperSlide className='banner_Slide_item'>Slide 1</SwiperSlide>
            <SwiperSlide className='banner_Slide_item'>Slide 2</SwiperSlide>
            <SwiperSlide className='banner_Slide_item'>Slide 3</SwiperSlide>
        </Swiper>

        <div className="home_txt_1">다양한 칵테일 레시피 둘러보기</div>
        <Swiper


            slidesPerView={3.50}
            centeredSlides={true}
            navigation={true}
            allowTouchMove={false}
            autoplay={{delay:1}}
            loop = {true}
            loopFillGroupWithBlank={true}
            loopAdditionalSlides={1}
            spaceBetween={8}
            className="look_slide"
            
        >
              <SwiperSlide className='look_Slide_item'>Slide 1</SwiperSlide>
              <SwiperSlide className='look_Slide_item'>Slide 2</SwiperSlide>
              <SwiperSlide className='look_Slide_item'>Slide 3</SwiperSlide>
              <SwiperSlide className='look_Slide_item'>Slide 4</SwiperSlide>
              <SwiperSlide className='look_Slide_item'>Slide 5</SwiperSlide>
              <SwiperSlide className='look_Slide_item'>Slide 6</SwiperSlide>
            </Swiper>

            <div className="home_txt_2">For you</div>
            <div className="home_txt_3">추천 레시피가 필요한 당신에게</div>

            <h2>이 밑에는 아직 미정</h2>

            </div>
    );
}; 


