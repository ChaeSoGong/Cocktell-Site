'use client'
import { IoOptionsOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useReducer, useRef, useState } from "react";
import { blurURL } from "@/config";


//Develop by 임채윤
export default function MyBag() {
  const [mode, setMode] = useState('ALCOHOL');
  const [result, setResult] = useState(<></>);
  const [materialData, setMaterialData] = useState([]);
  const [cocktailData, setCocktailData] = useState(null);

  //Material Data 가져오기
  useEffect(() => {
    const getMaterial = async () => {
      const materialPromise = await fetch('/api/materialdata', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const materialList = await materialPromise.json();
      const alcoholList = await materialList.filter((material) => (material.type === "mainmaterial"));
      const drinkList = await materialList.filter((material) => (material.subtype === "sparkling" || material.subtype === "juice"));
      const dairyList = await materialList.filter((material) => (material.subtype === "dairy"));
      const condimentList = await materialList.filter((material) => (material.subtype === "condiment" && material.id !== Number(45) && material.id !== Number(44)));
      setMaterialData([
        { alcochol: alcoholList },
        { drink: drinkList },
        { dairy: dairyList },
        { condiment: condimentList }
      ])
    }
    getMaterial();
  }, [])
  useEffect(() => {
    if (cocktailData === null) { setCocktailData([]) }
  }, [])
  return (
    <div>
      <MyBagFilter materials={materialData}></MyBagFilter>
    </div>
  )

  /*
  const [itemCount, setItemCount] = useState(12);
  const [mainmaterailFilter, setMainmaterailFilter] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState([]);
  const [cocktailData, setCocktailData] = useState([]);
  const [content, setContent] = useState(null);
  //새로운 filter값이 입력되면 그에 맞게 filter 설정이 변경되고, 새로운 recipeList를 요청함
  useEffect(() => {
    const getRecipe = async () => {
      console.log(recipeFilter)
      console.log(mainmaterailFilter)

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
            <div className="recipe_item" key={data.id}>
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
            </div>
          )
        }))}
      </div>
    )
  }, [cocktailData])
*/
  return (
    <div className="recipe_page">
      {/* <Filter setRecipeFilter={setRecipeFilter} setMainmaterailFilter={setMainmaterailFilter}></Filter> Develop by 장소현 */}
      <Filter></Filter> {/* Develop by 장소현 */}
      {result} {/* Develop by 임채윤 */}
    </div>
  )
}

function MyBagFilter(props) {
  const dataList = props.material
  console.log(dataList)
  // const [items, setItems] = useState(<></>);
  const [items, dispatchMode] = useReducer(reducer, []);
  const [selectItem, setSelectItem] = useState([]);

  //mode("모드") 값이 입력되면 그 모드에 따라 아이템 리스트를 변경해줌
  function reducer(mode, action) {
    switch(action.type){
      case "ALCOHOL":{return console.log('alcohol')}
      case "DRINK":{return console.log('drink')}
      case "DAIRY":{return console.log('dairy')}
      case "CONDIMENT":{return console.log('condiment')}
    }
  }
return (
  <div className="mybag_filter_box">
    <div className="mybag_filter_container">

      <div className="mybag_filter_title">재료</div>

      <div className="mybag_filter_main">
        <input type="button" onClick={()=>{dispatchMode({type:"ALCOHOL"})}} value={'술'} className="mybag_filter_sub"></input>
        <input type="button" onClick={()=>{dispatchMode({type:"DRINK"})}} value={'음료'} className="mybag_filter_sub"></input>
        <input type="button" onClick={()=>{dispatchMode({type:"DAIRY"})}} value={'유제품'} className="mybag_filter_sub"></input>
        <input type="button" onClick={()=>{dispatchMode({type:"CONDIMENT"})}} value={'향신료 & 소스'} className="mybag_filter_sub"></input>
      </div>
      
      <div className="mybag_filter_itemlist">a{items}</div>
      <div className="mybag_filter_selected">b{selectItem}</div>

    </div>
  </div>
)
}



//Develop by 장소현
export function Filter(props) {

  /*
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
  
      props.setRecipeFilter(newFilter)*/



  return (
    <>
      <div className="mybag_dropdown">
        <div className="mybag_dropdown_content">
          <div className="mabag_dropdown_base">
            <h2>베이스</h2>
            <form className="mybag_dropdown_base_form">
              {/* <input type="checkbox" name="recipe_base" id="recipe_base_1" value="보드카" onClick={changeBase} className="recipe_dropdown_base_item" />
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
              <label htmlFor="recipe_base_6">브랜디</label>*/}
              <input type="checkbox" name="recipe_base" id="recipe_base_1" value="보드카" className="recipe_dropdown_base_item" />
              <label htmlFor="recipe_base_1">보드카</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_2" value="진" />
              <label htmlFor="recipe_base_2">진</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_3" value="럼" />
              <label htmlFor="recipe_base_3">럼</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_4" value="데킬라" />
              <label htmlFor="recipe_base_4">데킬라</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_5" value="위스키" />
              <label htmlFor="recipe_base_5">위스키</label>
              <input type="checkbox" name="recipe_base" id="recipe_base_6" value="브랜디" />
              <label htmlFor="recipe_base_6">브랜디</label>
            </form>
          </div>
          <div className="mybag_dropdwon_material">
            <h2>재료</h2>
            <form>
              <input type="radio" id="mybag_dropdwon_material_drink" name="material" value="drink" />
              <label htmlFor="mybag_dropdwon_material_drink">술</label>
              <input type="radio" id="mybag_dropdwon_material_juice" name="material" value="juice" />
              <label htmlFor="mybag_dropdwon_material_juice">음료</label>
              <input type="radio" id="mybag_dropdwon_material_dairy" name="material" value="dairy" />
              <label htmlFor="mybag_dropdwon_material_dairy"> 유제품</label>
              <input type="radio" id="mybag_dropdwon_material_condiment" name="material" value="condiment" />
              <label htmlFor="mybag_dropdwon_material_condiment">향신료 & 소스</label>

              <input type="checkbox" id="mybag_dropdwon_material_drink_list" />
              <label htmlFor="mybag_dropdwon_material_drink_list">술</label>

            </form>
          </div>
          <div className="recipe_dropdown_level">
            <h2>제작난이도</h2>
            <form className="recipe_dropdown_level_form" id="recipe_dropdown_level_form">
              <fieldset>
                {/* <input type="radio" name="recipe_level" value="5" id="rate1" onClick={changeLevel} />
                <label htmlFor="rate1">★</label>
                <input type="radio" name="recipe_level" value="4" id="rate2" onClick={changeLevel} />
                <label htmlFor="rate2">★</label>
                <input type="radio" name="recipe_level" value="3" id="rate3" onClick={changeLevel} />
                <label htmlFor="rate3">★</label>
                <input type="radio" name="recipe_level" value="2" id="rate4" onClick={changeLevel} />
                <label htmlFor="rate4">★</label>
                <input type="radio" name="recipe_level" value="1" id="rate5" onClick={changeLevel} />
                <label htmlFor="rate5">★</label> */}
                <input type="radio" name="recipe_level" value="5" id="rate1" />
                <label htmlFor="rate1">★</label>
                <input type="radio" name="recipe_level" value="4" id="rate2" />
                <label htmlFor="rate2">★</label>
                <input type="radio" name="recipe_level" value="3" id="rate3" />
                <label htmlFor="rate3">★</label>
                <input type="radio" name="recipe_level" value="2" id="rate4" />
                <label htmlFor="rate4">★</label>
                <input type="radio" name="recipe_level" value="1" id="rate5" />
                <label htmlFor="rate5">★</label>
              </fieldset>
            </form>
          </div>
          <div className="recipe_dropdown_degree">
            <h2>알코올 도수</h2>
            <div className="recipe_dropdown_degree_box">
              {/* <input type="number" placeholder="최솟값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_min" onChange={changeInputMin}></input>
              <h4>이상</h4>
            </div>
            <h3>~</h3>
            <div className="recipe_dropdown_degree_box">
              <input type="number" placeholder="최댓값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_max" onChange={changeInputMax}></input>
              <h4>이하</h4> */}
              <input type="number" placeholder="최솟값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_min" ></input>
              <h4>이상</h4>
            </div>
            <h3>~</h3>
            <div className="recipe_dropdown_degree_box">
              <input type="number" placeholder="최댓값" className="recipe_dropdown_degree_num" id="recipe_dropdown_degree_max"></input>
              <h4>이하</h4>
            </div>


          </div>
          <div className="recipe_dropdown_hashtag">
            <h2>해시태그</h2>
            <form className="recipe_dropdown_hashtag_form flex justify-between">
              {/* <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_1" value="달콤" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_1"># 달콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_2" value="상큼" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_2"># 상큼</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_3" value="새콤" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_3"># 새콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_4" value="깔끔" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_4"># 깔끔</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_5" value="탄산" onClick={changeTag} />
              <label htmlFor="recipe_hashtag_5"># 탄산</label> */}
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_1" value="달콤" />
              <label htmlFor="recipe_hashtag_1"># 달콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_2" value="상큼" />
              <label htmlFor="recipe_hashtag_2"># 상큼</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_3" value="새콤" />
              <label htmlFor="recipe_hashtag_3"># 새콤</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_4" value="깔끔" />
              <label htmlFor="recipe_hashtag_4"># 깔끔</label>
              <input type="checkbox" name="recipe_hashtag" id="recipe_hashtag_5" value="탄산" />
              <label htmlFor="recipe_hashtag_5"># 탄산</label>
            </form>
            <div className="recipe_dropdown_submitBox">

              {/* <form className="recipe_dropdown_submit_form" onSubmit={pushSubmit}>
                <input type="submit" value="검색하기" className="recipe_dropdown_submit" />
              </form> */}
              <form className="recipe_dropdown_submit_form">
                <input type="submit" value="검색하기" className="recipe_dropdown_submit" />
              </form>
            </div>

          </div>

        </div>
      </div>
      <div>
      </div>
    </>
  )
}
