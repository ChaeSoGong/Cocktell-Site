'use client'

import { cocktailsFETCH } from '@/app/api/route';
import { useRouter } from 'next/navigation';
import { useState, useEffect} from 'react';
export default function CocktailCreate() {
    const router = useRouter();
    const [cocktailData, setCocktailData] = useState([]);
    const [content, setContent] = useState(<div>입력된 정보가 없습니다</div>);

    useEffect(()=>{ //새로운 값이 추가/삭제 될때마다 content 새로고침
      const cocktailsClientFETCH = async() => { //칵테일 데이터를 가져오는 async 함수
        try{
            await setCocktailData(await cocktailsFETCH('GET'));
        }catch(error){
            console.log('Client message : Failed Data Fetch!!')
        }
      }
      cocktailsClientFETCH().then( //새로운 데이터를 가져오면...
        setContent(                 //새로운 데이터를 토대로 setContent
          <div className='cocktail-list'>
            {cocktailData.reverse().map((cocktail)=>{
              return(
                <div className='cocktail-item' key={cocktail.id} style={{border:"1px solid green"}}>
                  {cocktail.id+": 칵테일 고유 id"}<br/>
                  {'칵테일 이름 : '+cocktail.name}<br/>
                  {'한줄평 : '+cocktail.comment}<br/>
                  {'레시피 : '+cocktail.description}<br/>
                  {'맛 : '+cocktail.taste}<br/>
                  {'주재료 :['+cocktail.materials.base+'], 부재료:['+cocktail.materials.body+'],가니쉬:['+cocktail.materials.garnish+"]"}<br/>
                  {'도수 : '+cocktail.alcohol}<br/>
                  {'잔 : '+cocktail.glass}<br/>
                  {'기법 : '+cocktail.skill}<br/>
                  <input type='button' onClick={async(event)=>{ //삭제 버튼
                    event.preventDefault();
                    cocktailsFETCH('DELETE', cocktail.id)
                    alert('삭제되었습니다. 새로고침해주세요');
                  }} value={'삭제하기'} style={{backgroundColor:'skyblue'}}></input>
                </div>
              )
            })
          }
        </div>
        )
      )
    },[cocktailData]);

    const [cocktailName, setCocktailName] = useState(""); //칵테일 이름
    const onCocktailNameChange = (e) =>{
      setCocktailName(e.target.value);
    };
    const [comment, setComment] = useState(""); //칵테일 한줄평
    const onCommentChange = (e) =>{
      setComment(e.target.value);
    };
    const [description, setDescription] = useState(""); //칵테일 레시피
    const onDescriptionChange = (e) =>{
      setDescription(e.target.value);
    }
    const [taste, setTaste] = useState(""); //칵테일 맛
    const onTasteChange = (e) =>{
      setTaste(e.target.value);
    };
    const [base, setBase] = useState(""); //칵테일 주재료
    const onBaseChange = (e) =>{
      setBase(e.target.value);
    };
    const [body, setBody] = useState(""); //칵테일 부재료
    const onBodyChange = (e) =>{
      setBody(e.target.value);
    }
    const [garnish, setGarnish] = useState(""); //칵테일 가니쉬
    const onGarnishChange = (e) =>{
      setGarnish(e.target.value);
    }
    const [alcohol, setAlcohol] = useState(0); //칵테일 도수
    const onAlcoholChange = (e) =>{
      setAlcohol(e.target.value);
    };
    const [glass, setGlass] = useState(""); //칵테일 잔
    const onGlassChange = (e) =>{
      setGlass(e.target.value);
    }
    const [skill, setSkill] = useState(""); //칵테일 기술
    const onSkillChange = (e) =>{
      setSkill(e.target.value);
    }
    const onCreateCocktail = async(event) => {
        event.preventDefault();
        const data = {
            name:cocktailName,
            comment:comment,
            description:description,
            taste:taste.split(','),
            materials:{
                base:base.split(','),
                body:body.split(','),
                garnish:garnish.split(','),
            },
            alcohol:alcohol,
            glass:glass,
            skill:skill.split(','),
        }
        cocktailsFETCH('POST', data);
        alert("추가되었습니다. 새로고침해주세요");
    }

    return (
      <div>
        <form onSubmit={onCreateCocktail}>
        <input value={cocktailName} onChange={onCocktailNameChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='칵테일 이름을 입력하세요'></input>
        <input value={comment} onChange={onCommentChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='한줄평을 입력하세요'></input>
        <textarea value={description} onChange={onDescriptionChange} className='h-40 border-2 mb-4' placeholder='레시피를 입력하세요'></textarea><br/>
        <input value={taste} onChange={onTasteChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='맛을 입력하세요'></input><br/>
        <input value={base} onChange={onBaseChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='주재료를 입력하세요'></input>
        <input value={body} onChange={onBodyChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='부재료를 입력하세요'></input><br/>
        <input value={garnish} onChange={onGarnishChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='가니쉬를 입력하세요'></input>
        도수 <input value={alcohol} onChange={onAlcoholChange} className='h-10 w-96 border-2 mb-4' type='number'></input><br/>
        <input value={glass} onChange={onGlassChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='잔을 입력하세요'></input>
        <input value={skill} onChange={onSkillChange} className='h-10 w-96 border-2 mb-4' type='text' placeholder='기법을 입력하세요'></input>
        <input type='submit' className='h-10 w-40 bg-red-400' value={'생성하기'}></input>   
        </form>
        {content}
      </div>
    );
};