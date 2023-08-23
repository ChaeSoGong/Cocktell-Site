'use client'
import { IoOptionsOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { blurURL } from "@/config";


//Develop by 임채윤
export default function Recipe() {
  const [itemCount, setItemCount] = useState(12);
  const [mainmaterailFilter, setMainmaterailFilter] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState([]);
  const [cocktailData, setCocktailData] = useState([]);
  const [content, setContent] = useState(
    <div className="recipe_skeleton">
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
      <div className="recipe_skeleton_item"></div>
    </div>
  );
  //새로운 filter값이 입력되면 그에 맞게 filter 설정이 변경되고, 새로운 recipeList를 요청함
  useEffect(() => {
    const getRecipe = async () => {
      // console.log(recipeFilter)
      // console.log(mainmaterailFilter)

      let options = { //*const로 적혀있어서 값이 변경되지 않는 대참사가 일어났었음 2시간 투자함*
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: itemCount,
          filter: {
            "and": [//기본으로 Cocktell 레시피만 보여줌
              { "property": "type", "select": { "equals": "Cocktell" } },
              { "or": mainmaterailFilter },
              { "and": recipeFilter }
            ]
          },
          sorts: [
            {
              "property": "id",
              "direction": "ascending"
            }
          ]
        })

      }
      const dataPromise = await fetch('http://localhost:3000/api/recipedata', options);
      setCocktailData(await dataPromise.json());
    }
    getRecipe();
  }, [recipeFilter]);

  useEffect(() => {
    setContent(
      <div className="recipe_container">
        {cocktailData.map((data => {
          return (
            <RecipeItem key={data.id} data={data}></RecipeItem>
/*             <div className="recipe_item" key={data.id}>
              <div className="recipe_img_box">
                <div className="recipe_img">
                  <Link href={`/recipe/${data.id}`}>
                    <Image src={data.image} alt={data.name} placeholder="blur" blurDataURL={blurURL}
                      fill={true} sizes="265"></Image>
                  </Link>
                </div>
                <div className="recipe_caption">
                  <div className="recipe_tag_container">
                    {data.taste.map((taste, i) => {
                      if (i > 2) { return null };
                      return (
                        <div key={i} className="recipe_tag_item tag_taste"># {taste}</div>
                      )
                    })}
                  </div>
                  <div className="recipe_tag_container">
                    {data.skill.map((skill, i) => {
                      return (
                        <div key={i} className="recipe_tag_item tag_skill"># {skill}</div>
                      )
                    })}
                  </div>
                  <div className="recipe_tag_container">
                    <div className="recipe_tag_item tag_glass"># {data.glass} 글라스</div>
                  </div>
                </div>
              </div>
              <div className="recipe_infor_box">
                <div className="recipe_infor">
                  <div className="recipe_name">{data.name}</div>
                </div>
                <div className="recipe_comment">{data.comment}</div>
                <div className="recipe_detail">
                  <div className="recipe_difficulty">
                    제작 난이도
                    <span className="text-xs border h-4 text-gray-400" style={{ margin: "0 8px" }}></span>
                    <div className="recipe_star text-yellow-500">
                      {data.level === '1' ? "★☆☆☆☆" : null}
                      {data.level === '2' ? "★★☆☆☆" : null}
                      {data.level === '3' ? "★★★☆☆" : null}
                      {data.level === '4' ? "★★★★☆" : null}
                      {data.level === '5' ? "★★★★★" : null}
                    </div>
                  </div>
                  <div className="recipe_alcohol text-gray-600 mr-2">{data.degree}%</div>
                </div>
              </div>
            </div> */
          )
        }))}
      </div>
    )
  }, [cocktailData])

  return (
    <div className="recipe_page">
      <Logo></Logo> {/* Develop by 임채윤 */}
      <Filter setRecipeFilter={setRecipeFilter} setMainmaterailFilter={setMainmaterailFilter}></Filter> {/* Develop by 장소현 */}
      {content} {/* Develop by 임채윤 */}
      <MoreContent itemCount={itemCount} setItemCount={setItemCount} ></MoreContent>
    </div>
  )
}
function RecipeItem(props) {
  return (
    <div className="recipe_item" key={props.data.id}>
      <div className="recipe_img_box">
        <div className="recipe_img">
          <Link href={`/recipe/${props.data.id}`}>
            <img src={props.data.image} alt={props.data.name}
              sizes="265"></img>
          </Link>
        </div>
        <div className="recipe_caption">
          <div className="recipe_tag_container">
            {props.data.taste.map((taste, i) => {
              if (i > 2) { return null };
              return (
                <div key={i} className="recipe_tag_item tag_taste"># {taste}</div>
              )
            })}
          </div>
          <div className="recipe_tag_container">
            {props.data.skill.map((skill, i) => {
              return (
                <div key={i} className="recipe_tag_item tag_skill"># {skill}</div>
              )
            })}
          </div>
          <div className="recipe_tag_container">
            <div className="recipe_tag_item tag_glass"># {props.data.glass}</div>
          </div>
        </div>
      </div>
      <div className="recipe_infor_box">
        <div className="recipe_infor">
          <div className="recipe_name">{props.data.name}</div>
        </div>
        <div className="recipe_comment">{props.data.comment}</div>
        <div className="recipe_detail">
          <div className="recipe_difficulty">
            제작 난이도
            <span className="text-xs border h-4 text-gray-400" style={{ margin: "0 8px" }}></span>
            <div className="recipe_star text-yellow-500">
              {props.data.level === '1' ? "★☆☆☆☆" : null}
              {props.data.level === '2' ? "★★☆☆☆" : null}
              {props.data.level === '3' ? "★★★☆☆" : null}
              {props.data.level === '4' ? "★★★★☆" : null}
              {props.data.level === '5' ? "★★★★★" : null}
            </div>
          </div>
          <div className="recipe_alcohol text-gray-600 mr-2">{props.data.degree}%</div>
        </div>
      </div>
    </div>
  )
}


//Develop by 임채윤
export function Logo() {
  return (
    <a href="/recipe">
      <div className="flex flex-col items-center mt-28 mb-16 select-none">
        <h2 className="text-5xl w-fit mb-8 font-[600]">레시피</h2>
        <h3 className="text-lg w-fit">칵텔의 레시피를 카테고리별로 알아보세요</h3>
      </div>
    </a>
  )
}
//Develop by 장소현
export function Filter(props) {

  //알코올 도수는 값이 100이상이 넘어가지 않도록 && 음수가 되지 않도록 (O)
  // 최솟값은 최댓값보다 작으면 안된다.(O)
  // 최소 ~ 최대 
  // 베이스, 해시태그 다중 선택 가능 (O)
  const [mainmaterail, setMainmaterail] = useState([])
  const [level, setLevel] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [taste, setTaste] = useState([]);

  // 베이스 > 배열
  const changeBase = (event) => {
    if (event.target.checked) {
      const input = event.target.value
      const newInputBase = [...mainmaterail]
      newInputBase.push(input)
      setMainmaterail(newInputBase);
    }
    else if (!event.target.checked) {
      let newInputBase = [...mainmaterail];
      let result = newInputBase.filter((item) => ((item) !== event.target.value))
      setMainmaterail(result)
    }

  }
  // 제작 난이도
  const changeLevel = (event) => {
    setLevel(event.target.value)
  }

  // 알코올 도수
  const changeInputMin = (event) => { //min max 값 입력 됐을 때
    setMin(event.target.value)
  }

  const changeInputMax = (event) => { //min max 값 입력 됐을 때
    setMax(event.target.value)
  }

  // 해시태그 > 배열

  const changeTag = (event) => {
    if (event.target.checked) {
      const input = event.target.value
      const newInputTag = [...taste]
      newInputTag.push(input)
      setTaste(newInputTag);
    }
    else if (!event.target.checked) {
      let newInputTag = [...taste];
      let result = newInputTag.filter((item) => ((item) !== event.target.value))
      setTaste(result)
    }
  }

  // const [mainmaterail, setMainmaterail] = useState([])
  // const [level, setLevel] = useState(0);
  // const [min, setMin] = useState(0);
  // const [max, setMax] = useState(0);
  // const [taste, setTaste] = useState([])
  //   {type:cocktell} && [[base:진 && level:2] || [base:럼 && level:2]]

  const pushSubmit = (event) => {
    event.preventDefault();
    if (min < 0 || min > 100) {
      return alert('잘못된 최솟값 범위입니다.(0~100)')
    }
    if (max < 0 || max > 100) {
      return alert('잘못된 최솟값 범위입니다.(0~100)')
    }
    if (max < min) {
      return alert('최댓값은 최솟값보다 커야 합니다.')
    }
    const input = ([])
    let inputItem = (null)

    //level
    if (level != 0) {//0이면 포함시키면 안됨
      inputItem = ({ "property": "level", "select": { "equals": level } })
      input.push(inputItem)
    }

    //degree
    inputItem = ({ "property": "degree", "number": { "greater_than_or_equal_to": Number(min) } })
    input.push(inputItem)
    inputItem = ({ "property": "degree", "number": { "less_than_or_equal_to": Number(max) } })
    input.push(inputItem)

    //hashtag
    taste.map((item) => {
      inputItem = ({ "property": "taste", "multi_select": { "contains": item } })
      input.push(inputItem)

    })
    // setMainmaterailFilter mainmaterailFilter

    //mainmaterial
    var mainInput = ([])

    if (mainmaterail.length != 0) {
      var newMainInput = (null)
      mainmaterail.map((item) => {
        newMainInput = ({ "property": "mainmaterial", "multi_select": { "contains": item } })
        mainInput.push(newMainInput)
      })
    }

    props.setMainmaterailFilter(mainInput)

    // props.setMainmaterailFilter()



    var newFilter = []
    input.map((item) => {
      newFilter.push(item)

    })

    props.setRecipeFilter(newFilter)


  }

  return (
    <>
      <div className="recipe_dropdown">
        <label className="recipe_dropdown_label" htmlFor="ck1"><IoOptionsOutline /></label>
        {/* shadow처리하기 */}
        <input type="checkbox" className="recipe_dropdown_checkbox" id="ck1" />
        {/* 여기부터는 드롭다운 내용 */}

        <div className="recipe_dropdown_content">
          <div className="recipe_dropdown_base">
            <h2>베이스</h2>
            <form className="recipe_dropdown_base_form">
              <input type="checkbox" name="recipe_base" id="recipe_base_1" value="보드카" onClick={changeBase} className="recipe_dropdown_base_item" />
              <label htmlFor="recipe_base_1">보드카</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_2" value="진" onClick={changeBase} />
              <label htmlFor="recipe_base_2">진</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_3" value="럼" onClick={changeBase} />
              <label htmlFor="recipe_base_3">럼</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_4" value="데킬라" onClick={changeBase} />
              <label htmlFor="recipe_base_4">데킬라</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_5" value="위스키" onClick={changeBase} />
              <label htmlFor="recipe_base_5">위스키</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_6" value="브랜디" onClick={changeBase} />
              <label htmlFor="recipe_base_6">브랜디</label>

            </form>
          </div>
          <div className="recipe_dropdown_level">
            <h2>제작난이도</h2>
            <form className="recipe_dropdown_level_form" id="recipe_dropdown_level_form">
              <fieldset>
                <input type="radio" name="recipe_level" value="5" id="rate1" onClick={changeLevel} />
                <label htmlFor="rate1">★</label>
                <input type="radio" name="recipe_level" value="4" id="rate2" onClick={changeLevel} />
                <label htmlFor="rate2">★</label>
                <input type="radio" name="recipe_level" value="3" id="rate3" onClick={changeLevel} />
                <label htmlFor="rate3">★</label>
                <input type="radio" name="recipe_level" value="2" id="rate4" onClick={changeLevel} />
                <label htmlFor="rate4">★</label>
                <input type="radio" name="recipe_level" value="1" id="rate5" onClick={changeLevel} />
                <label htmlFor="rate5">★</label>
              </fieldset>
            </form>
          </div>
          <div className="recipe_dropdown_degree">
            <h2>알코올 도수</h2>
            <div className="recipe_dropdown_degree_box">
              <input type="number" placeholder="최솟값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_min" onChange={changeInputMin}></input>
              <h4>이상</h4>
            </div>
            <h3>~</h3>
            <div className="recipe_dropdown_degree_box">
              <input type="number" placeholder="최댓값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_max" onChange={changeInputMax}></input>
              <h4>이하</h4>
            </div>


          </div>
          <div className="recipe_dropdown_hashtag">
            <h2>해시태그</h2>
            <form className="recipe_dropdown_hashtag_form flex justify-between">
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_1" value="달콤" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_1"># 달콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_2" value="상큼" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_2"># 상큼</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_3" value="새콤" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_3"># 새콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_4" value="깔끔" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_4"># 깔끔</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_5" value="탄산" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_5"># 탄산</label>
            </form>
            <div className="recipe_dropdown_submitBox">

              <form className="recipe_dropdown_submit_form" onSubmit={pushSubmit}>
                <input type="submit" value="검색하기" className="recipe_dropdown_submit" />
              </form>
            </div>

          </div>

        </div>
      </div>
      <div>
        {/* <span className="bg-red-100">칵텔 랭킹순</span> */}
      </div>
    </>
  )
}
//Develop by 임채윤
export function MoreContent(props) {
  const addItem = () => {

  }
  return (
    <div>
      <button value={'컨텐츠 추가하기'}></button>
    </div>
  )
}


