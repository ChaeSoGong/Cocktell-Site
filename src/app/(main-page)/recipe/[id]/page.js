import { blurURL } from '@/config';
import Image from 'next/image'
export default async function RecipeDetail(props) {
  const id = props.params.id;
  // const cocktail = await getRecipeData('id', id);
  const cocktailPromise = await fetch(`http://localhost:3000/api/recipedata/${id}`,
    { method: "GET" })
  const cocktailData = await cocktailPromise.json();

  const BaseName = () => {
    if (cocktailData.mainmaterial[0] !== undefined) {
      return (<div>
        {cocktailData.mainmaterial[0]} 베이스의 칵테일
      </div>)
    }
    else {
      return (<>
        베이스가 없는 칵테일
      </>)
    }
  }

  const MainMaterialName = () => {
    if (cocktailData.mainmaterial.length !== 0) {
      return (<ul style={{ listStyleType: "disc" }}>
        {cocktailData.mainmaterial.map((item) => {
          return (<li key={item.id}>{item}</li>)
        })}
      </ul>)
    }
    else {
      return (<>
        주재료가 없어요.
      </>)
    }
  }

  const SubMaterialName = () => {
    if (cocktailData.submaterial.length !== 0) {
      return (<ul style={{ listStyleType: "disc" }}>
        {cocktailData.submaterial.map((item) => {
          return (<li key={item.id}>{item}</li>)

        })}
      </ul>)
    }
    else {
      return (<>
        부재료가 없어요.
      </>)
    }
  }

  const GarnishMaterialName = () => {
    if (cocktailData.garnish.length !== 0) {
      return (<ul style={{ listStyleType: "disc" }}>
        {cocktailData.garnish.map((item) => {
          return (<li key={item.id}>{item}</li>)

        })}
      </ul>)
    }
    else {
      return (<>
        가니쉬가 없어요.
      </>)
    }
  }

  const Description = () => {
    var afterStr = cocktailData.description.split('\\n');
    // console.log(afterStr)
    return (
      <ul>
        {afterStr.map((item, index) => {
          return (
            <li key={index}><span className='recipe_detail_description_number'>{index + 1}</span>
              <span className='recipe_detail_description_naeyong'>{item}</span>
            </li>

          )
        })}
      </ul>
    )
  }

  const TasteName = () => {
    if (cocktailData.taste.length > 1) {
      var array = []
      for (let i = 0; i < cocktailData.taste.length - 1; i++) {
        array.push(cocktailData.taste[i])
      }
      return (
        <>
          {array.map((item) => {
            return (<>
              {item}, { }
            </>
            )

          })

          }
          {cocktailData.taste[cocktailData.taste.length - 1]}

        </>
      )
    }
    else {
      return (
        <>
          {cocktailData.taste}
        </>
      )
    }

  }

  const SkillName = () => {
    if (cocktailData.skill.length > 1) {
      var array = []
      for (let i = 0; i < cocktailData.skill.length - 1; i++) {
        array.push(cocktailData.skill[i])
      }
      return (
        <>
          {array.map((item) => {
            return (<>
              {item}, { }
            </>
            )

          })

          }
          {cocktailData.skill[cocktailData.skill.length - 1]}

        </>
      )
    }
    else {
      return (
        <>
          {cocktailData.skill}
        </>
      )
    }

  }

  return (
    <div>
      <div className='recipe_detail_top'>

        <div className='recipe_detail_image'>
          <Image src={cocktailData.image} alt={cocktailData.name} fill="true" placeholder="blur" blurDataURL={blurURL} sizes='800'></Image>
        </div>
        <div className='recipe_detail_top_txt_box'>
          <div className='recipe_detail_top_txt'>
            <h2>레시피 정보</h2>
          </div>
          <div className='recipe_detail_top_txt_item'>
            <h3>난이도</h3>
            <div className="recipe_detail_top_txt_item_star text-yellow-500">
              {cocktailData.level === '1' ? "★☆☆☆☆" : null}
              {cocktailData.level === '2' ? "★★☆☆☆" : null}
              {cocktailData.level === '3' ? "★★★☆☆" : null}
              {cocktailData.level === '4' ? "★★★★☆" : null}
              {cocktailData.level === '5' ? "★★★★★" : null}
            </div>
          </div>

          <div className='recipe_detail_top_txt_item'>
            <h3>알코올 도수</h3>
            <h4>{cocktailData.degree}</h4>
          </div>

          <div className='recipe_detail_top_txt_item'>
            <h3>조주 기법</h3>
            <h4><SkillName/></h4>
          </div>

          <div className='recipe_detail_top_txt_item'>
            <h3>잔</h3>
            <h4>{cocktailData.glass}</h4>
          </div>

          <div className='recipe_detail_top_txt_item'>
            <h3>맛</h3>
            <h4><TasteName /></h4>
            {/* <TasteName/> */}
          </div>
        </div>

      </div>
      <div className='recipe_detail_bottom'>
        <div className='recipe_detail_bottom_name'>
          <h3><BaseName /></h3>
          <h2>{cocktailData.name}</h2>
          <h3>{`"${cocktailData.comment}"`}</h3>
        </div>
        <div className='recipe_detail_bottom_item_box'>
          <h2>재료들</h2>
          <div className='recipe_detail_bottom_item'>
            <div className='recipe_detail_bottom_item_list'>
              <h3>주재료</h3>
              <div className='recipe_detail_bottom_item_material'><MainMaterialName /></div>
            </div>
            <div className='recipe_detail_bottom_item_list'>
              <h3>부재료</h3>
              <div className='recipe_detail_bottom_item_material'><SubMaterialName /></div>
            </div>
            <div className='recipe_detail_bottom_item_list'>
              <h3>가니쉬</h3>
              <div className='recipe_detail_bottom_item_material'><GarnishMaterialName /></div>
            </div>
          </div>
        </div>


        <div>
          <h2>제조법</h2>
          <div className='recipe_detail_bottom_info'>

            <Description />
          </div>
        </div>
      </div>

    </div>

  )
}