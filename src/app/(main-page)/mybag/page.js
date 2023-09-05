'use client'
import { IoOptionsOutline } from "react-icons/io5";
import { BiSearchAlt2 } from "react-icons/bi";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useReducer, useRef, useState } from "react";
import { blurURL } from "@/config";

//Develop by 임채윤
export default function MyBag() {
  const [filter, setFilter] = useState([]); //필터 설정
  const [filterConfig, setFilterConfig] = useState(null); //데이터 가져오기 위한 애
  const [content, setContent] = useState(null);
  const [cocktailData, setCocktailData] = useState(null);
  useEffect(() => {
    if (filterConfig !== null) {
      // console.log(filterConfig, '여기')
      const getRecipe = async () => {
        const recipePromise = await fetch('/api/allcocktaildata', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            page_size: 6,
            filter:
              { "or": filterConfig }
          }),
        })
        const recipeData = await recipePromise.json();
        setCocktailData(recipeData);
      };
      getRecipe();
    }
  }, [filterConfig])
  useEffect(() => {
    if (content !== null) {
      setContent(<>
        <h2 style={{ backgroundColor: "#ffffff" }}>스크롤을 내려 레시피를 확인해보세요</h2>
        <div className="mybag_result">
          {cocktailData.map(item => <div className="mybag_result_item" key={item.id}>
            <div className="mybag_result_img">
              <Image src={item.image} alt={item.name} fill sizes="300"></Image>
            </div>
            <div className="mybag_result_text">{item.name}</div>
          </div>
          )}
        </div>
      </>)
    } else { setContent(<h2>재료를 골라 레시피를 찾아보세요</h2>) }
  }, [cocktailData])
  return (
    <div className="mybag_page">
      <MyBagFilter setFilter={setFilter} setFilterConfig={setFilterConfig}></MyBagFilter>
      {content}
    </div>
  )
}

function MyBagFilter(props) {
  //재료데이터 목록
  const [materialData, setMaterialData] = useState([]);
  useEffect(() => {
    // console.log(tagList.alcohol.length === 0)
    if (materialData.length === 0) {
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
        const fruitVeggieList = await materialList.filter((material) => (material.subtype === "fruit" || material.subtype === "vegitable"));
        const condimentList = await materialList.filter((material) => (material.subtype === "condiment" && material.id !== Number(45) && material.id !== Number(44)));
        setMaterialData([alcoholList, drinkList, dairyList, condimentList, fruitVeggieList])
      }
      getMaterial();
    }
    else { //한번 로딩이 되어있다면...
      console.log(materialData);
    }
  }, [materialData])

  const [tags, setTags] = useState([])
  const [alcoholTags, setAlcoholTags] = useState([])
  const [drinkTags, setDrinkTags] = useState([])
  const [dairyTags, setDairyTags] = useState([])
  const [condimentTags, setCondimentTags] = useState([])
  const [fruitVeggieTags, setFruitVeggieTags] = useState([])
  const onAlcoholChange = (e) => {
    if (e.target.checked) {
      const input = e.target.value;
      let newTagList = [...alcoholTags];
      newTagList.push(input);
      setAlcoholTags(newTagList);
      let newAllTagList = [...tags];
      newAllTagList.push(input);
      setTags(newAllTagList);
    }
    else if (!e.target.checked) {
      let newTagList = [...alcoholTags];
      newTagList = newTagList.filter(item => (item !== e.target.value))
      setAlcoholTags(newTagList)
      let newAllTagList = [...tags];
      newAllTagList = newAllTagList.filter(item => (item !== e.target.value))
      setTags(newAllTagList)
    }
  }
  const onDrinkChange = (e) => {
    if (e.target.checked) {
      const input = e.target.value;
      let newTagList = [...drinkTags];
      newTagList.push(input);
      setDrinkTags(newTagList);
      let newAllTagList = [...tags];
      newAllTagList.push(input);
      setTags(newAllTagList);
    }
    else if (!e.target.checked) {
      let newTagList = [...drinkTags];
      newTagList = newTagList.filter(item => (item !== e.target.value))
      setDrinkTags(newTagList)
      let newAllTagList = [...tags];
      newAllTagList = newAllTagList.filter(item => (item !== e.target.value))
      setTags(newAllTagList)
    }
  }
  const onDairyChange = (e) => {
    if (e.target.checked) {
      const input = e.target.value;
      let newTagList = [...dairyTags];
      newTagList.push(input);
      setDairyTags(newTagList);
      let newAllTagList = [...tags];
      newAllTagList.push(input);
      setTags(newAllTagList);
    }
    else if (!e.target.checked) {
      let newTagList = [...dairyTags];
      newTagList = newTagList.filter(item => (item !== e.target.value))
      setDairyTags(newTagList)
      let newAllTagList = [...tags];
      newAllTagList = newAllTagList.filter(item => (item !== e.target.value))
      setTags(newAllTagList)
    }
  }
  const onCondimentChange = (e) => {
    if (e.target.checked) {
      const input = e.target.value;
      let newTagList = [...condimentTags];
      newTagList.push(input);
      setCondimentTags(newTagList);
      let newAllTagList = [...tags];
      newAllTagList.push(input);
      setTags(newAllTagList);
    }
    else if (!e.target.checked) {
      let newTagList = [...condimentTags];
      newTagList = newTagList.filter(item => (item !== e.target.value))
      setCondimentTags(newTagList)
      let newAllTagList = [...tags];
      newAllTagList = newAllTagList.filter(item => (item !== e.target.value))
      setTags(newAllTagList)
    }
  }
  const onFruitVeggieChange = (e) => {
    if (e.target.checked) {
      const input = e.target.value;
      let newTagList = [...fruitVeggieTags];
      newTagList.push(input);
      setFruitVeggieTags(newTagList);

      let newAllTagList = [...tags];
      newAllTagList.push(input);
      setTags(newAllTagList);
    }
    else if (!e.target.checked) {
      let newTagList = [...fruitVeggieTags];
      newTagList = newTagList.filter(item => (item !== e.target.value))
      setFruitVeggieTags(newTagList)
      let newAllTagList = [...tags];
      newAllTagList = newAllTagList.filter(item => (item !== e.target.value))
      setTags(newAllTagList)
    }
  }

  /*   const onTagChange = (e) => {
      // console.log(e.target.value)
      if(e.target.checked){
        const input = e.target.value;
        let newTagList = [...tags];
        newTagList.push(input);
        setTags(newTagList);
      }
      else if (!e.target.checked) {
        let newTagList = [...tags];
        newTagList = newTagList.filter(item=>( item !== e.target.value ))
        setTags(newTagList)
      }
    } */

  const onFiltering = (e) => {
    e.preventDefault();
    if (alcoholTags.length === 0 && drinkTags.length === 0 && dairyTags.length === 0 && condimentTags.length === 0 && fruitVeggieTags.length === 0) {
      return alert("재료를 입력해주세요")
    }
    let input = []
    let inputItem = null
    tags.map(item => {
      inputItem = ({ "property": "mainmaterial", "multi_select": { "contains": item } })
      input.push(inputItem)
      inputItem = ({ "property": "submaterial", "multi_select": { "contains": item } })
      input.push(inputItem)
      inputItem = ({ "property": "garnish", "multi_select": { "contains": item } })
      input.push(inputItem)
    })
    // setFilterConfig(
    //   {
    //     "or": [{ "property": "mainmaterial", "multi_select": { "contains": "필터" } },
    //     { "property": "submaterial", "multi_select": { "contains": "필터" } },
    //     { "property": "garnish", "multi_select": { "contains": "필터" } },
    //     ]
    //   }
    //여기
    // props.setFilter([alcoholTags, drinkTags, dairyTags, condimentTags, fruitVeggieTags])
    // props.setFilter(tags)
    props.setFilterConfig(input)
  }
  return (
    <div className="mybag_filter_box">
      <div className="mybag_filter_container">
        <div className="mybag_filter_title">재료</div>


        <div className="mybag_filter_main">
          <div className="mybag_filter_category"> {/* 술 카테고리 */}
            <input type="radio" className="mybag_filter_radio" name="mybag_category" id="alcohol" value={'ALCOHOL'} />
            <label htmlFor="alcohol">술</label>
            <div className="mybag_filter_item">
              {materialData[0]?.map(item => <label className="mybag_tag" key={item.id}><input type="checkbox" onClick={onAlcoholChange} value={item.name} /><span>{item.name}</span></label>)}
            </div>
          </div>
          <div className="mybag_filter_category"> {/* 음료 카테고리 */}
            <input type="radio" className="mybag_filter_radio" name="mybag_category" id="drink" value={'DRINK'} />
            <label htmlFor="drink">음료</label>
            <div className="mybag_filter_item">
              {materialData[1]?.map(item => <label className="mybag_tag" key={item.id}><input type="checkbox" onClick={onDrinkChange} value={item.name} /><span>{item.name}</span></label>)}
            </div>
          </div>
          <div className="mybag_filter_category"> {/* 유제품 카테고리 */}
            <input type="radio" className="mybag_filter_radio" name="mybag_category" id="dairy" value={'DAIRY'} />
            <label htmlFor="dairy">유제품</label>
            <div className="mybag_filter_item">
              {materialData[2]?.map(item => <label className="mybag_tag" key={item.id}><input type="checkbox" onClick={onDairyChange} value={item.name} /><span>{item.name}</span></label>)}
            </div>
          </div>
          <div className="mybag_filter_category"> {/* 향신료 카테고리 */}
            <input type="radio" className="mybag_filter_radio" name="mybag_category" id="condiment" value={'CONDIMENT'} />
            <label htmlFor="condiment">향신료 & 소스</label>
            <div className="mybag_filter_item">
              {materialData[3]?.map(item => <label className="mybag_tag" key={item.id}><input type="checkbox" onClick={onCondimentChange} value={item.name} /><span>{item.name}</span></label>)}
            </div>
          </div>
          <div className="mybag_filter_category"> {/* 과일 & 야채 카테고리 */}
            <input type="radio" className="mybag_filter_radio" name="mybag_category" id="fruitveggie" value={'FRUITVEGGIE'} />
            <label htmlFor="fruitveggie">과일 & 야채</label>
            <div className="mybag_filter_item">
              {materialData[4]?.map(item => <label className="mybag_tag" key={item.id}><input type="checkbox" onClick={onFruitVeggieChange} value={item.name} /><span>{item.name}</span></label>)}
            </div>
          </div>
        </div>
        <div className="mybag_filter_background"></div>
        <div className="mybag_filter_selected">
          <h2 className="mybag_select_text">선택된 재료들</h2>
          <div className="mybag_select_tag_container">
            {tags.map((item, i) => <span key={i} className="mybag_select_tag">{item}</span>)}
            {/*             {alcoholTags.map((item,i)=><span key={i} className="mybag_select_tag">{item}</span>)}
            {drinkTags.map((item,i)=><span key={i} className="mybag_select_tag">{item}</span>)}
            {dairyTags.map((item,i)=><span key={i} className="mybag_select_tag">{item}</span>)}
            {condimentTags.map((item,i)=><span key={i} className="mybag_select_tag">{item}</span>)}
            {fruitVeggieTags.map((item,i)=><span key={i} className="mybag_select_tag">{item}</span>)} */}
          </div>
          <input type="button" value={'찾아보기'} className="mybag_submit" onClick={onFiltering} />
        </div>
      </div>
    </div>
  )
}



// -------------채윤 휴지통 --------------- //


/*   const onTagCheck = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    let newTags = [...tags];
    newTags.push(e.target.innerText);
    setTags(newTags);
    console.log(tags, newTags,'hi')
  } */

/* function Alcohol(props) {
return (
  <div className="mybag_filter_item" id="alcohol_item">
    {props.data?.map(item =>
      <label className="mybag_tag" key={item.id}>
        <input type="checkbox" /><span>{item.name}</span>
      </label>
    )}
  </div>
)
}
function Drink(props) {
return (
  <div className="mybag_filter_item" id="drink_item">
    {props.data?.map(item =>
      <label className="mybag_tag" key={item.id}>
        <input type="checkbox" /><span>{item.name}</span>
      </label>
    )}
  </div>
)
}
function Dairy(props) {
return (
  <div className="mybag_filter_item" id="dairy_item">
    {props.data?.map(item =>
      <label className="mybag_tag" key={item.id}>
        <input type="checkbox" /><span>{item.name}</span>
      </label>
    )}
  </div>
)
}
function Condiment(props) {
return (
  <div className="mybag_filter_item">
    {props.data?.map(item =>
      <label className="mybag_tag" key={item.id}>
        <input type="checkbox" /><span>{item.name}</span>
      </label>
    )}
  </div>
)
} */
