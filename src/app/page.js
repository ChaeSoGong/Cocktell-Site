//Hompage is Client Component
'use client'
import { useEffect, useRef } from 'react';
import { Banner, RecipePreview, CustomPreview, MyBagPreview } from './(client-component)/homepage';
export default function Home() {
  const observe = useRef();
  useEffect(()=>{ //Fade In / Fade Out 기능
    observe.current = new IntersectionObserver((e)=>{e.forEach(article=>{
      if (article.isIntersecting){ //감시중인 박스가 나타날 때..
        article.target.style.opacity = 1;
      } else{ //감시중인 박스가 사라질 때...
        article.target.style.opacity = 0;
      }
    })})
    document.querySelectorAll('article').forEach((article)=>{observe.current.observe(article)})
  },[]);
  return(      
    <div className='home_page'>
      <TailwindCSS value="mt-32"/>
      <Banner/>
      <TailwindCSS value="mt-52 mb-40 border-b border-gray-300"/>
      <RecipePreview/>
      <TailwindCSS value="mt-40 mb-40 border-b border-gray-300"/>
      <CustomPreview/>
      <TailwindCSS value="mt-40 mb-40 border-b border-gray-300"/>
      <MyBagPreview/>
      <TailwindCSS value="mt-40 mb-40 border-b border-gray-300"/>
    </div>
  );
};
function TailwindCSS(props){
  return(
    <div className={props.value}></div>
  )
}