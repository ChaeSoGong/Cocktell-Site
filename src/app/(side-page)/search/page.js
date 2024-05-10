import Image from "next/image";
import Link from "next/link";
export default async function Search() {
  const blurURL = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
    const materialAPI = await import("../../api/materialdata/route.js");
    const materialPromise = await materialAPI.serverPOST({
      page_size: 8,
      filter: {
        "or": [
          { "property": "id", "number": { "equals": 33 } },
          { "property": "id", "number": { "equals": 43 } },
          { "property": "id", "number": { "equals": 2 } },
          { "property": "id", "number": { "equals": 18 } },
          { "property": "id", "number": { "equals": 50 } },
          { "property": "id", "number": { "equals": 10 } },
          { "property": "id", "number": { "equals": 34 } },
          { "property": "id", "number": { "equals": 38 } },
        ]
      }
    });
/*     const materialPromise = await fetch('http://localhost:3000/api/materialdata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page_size: 8,
      filter: {
        "or": [
          { "property": "id", "number": { "equals": 33 } },
          { "property": "id", "number": { "equals": 43 } },
          { "property": "id", "number": { "equals": 2 } },
          { "property": "id", "number": { "equals": 18 } },
          { "property": "id", "number": { "equals": 50 } },
          { "property": "id", "number": { "equals": 10 } },
          { "property": "id", "number": { "equals": 34 } },
          { "property": "id", "number": { "equals": 38 } },
        ]
      }
    })
  }) */
  const materialList = await materialPromise.json();
  // console.log(materialList)
  //재료 배열 이름 materialList / map 함수로 활용하세용

    const recipeAPI = await import("../../api/recipedata/route.js");
    const recipePromise = await recipeAPI.serverPOST({
      page_size: 3,
      filter: {
        "or": [
          { "property": "id", "number": { "equals": 21 } },
          { "property": "id", "number": { "equals": 9 } },
          { "property": "id", "number": { "equals": 20 } },
        ]
      }
    })
/*     const recipePromise = await fetch('http://localhost:3000/api/recipedata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      page_size: 3,
      filter: {
        "or": [
          { "property": "id", "number": { "equals": 21 } },
          { "property": "id", "number": { "equals": 9 } },
          { "property": "id", "number": { "equals": 20 } },
        ]
      }
    })
  }) */
  const recipeList = await recipePromise.json();
  //칵테일 레시피 배열 이름 = recipeList / map 함수로 활용하세용



  return (
    <>
      <div className="search_box">
        <h2 className="search_txt">실시간 인기 레시피</h2>
        <div className="search_popular_item_container">
          {recipeList.map((num) => {
            return (<>
              <div className="search_popular_item">
                <div className="search_popular_img_container">
                  <Link href={`/recipe/${num.id}`} >
                    <img src={num?.image} alt={num.name} fill="true" sizes="300" />
                  </Link>
                </div>
                  <div className="search_popular_caption"> 
                    <h3>자세히 보기</h3>
                  </div>
                <Link href={`/recipe/${num.id}`} className="search_popular_item_img">
                  <div className="search_popular_item_infoBox">
                    <h2 className="search_popular_item_name">{num.name}</h2>
                    <h3>{num.comment}</h3>
                    <div className="search_popular_item_subInfo">
                      <div className="search_popular_item_left">
                        <h3 className="search_popular_item_level_txt">제작 난이도</h3>
                        <div className="search_popular_item_star text-yellow-500">
                          {num.level === '2' ? "★★☆☆☆" : null}
                          {num.level === '3' ? "★★★☆☆" : null}
                          {num.level === '4' ? "★★★★☆" : null}
                          {num.level === '5' ? "★★★★★" : null}
                        </div>
                      </div>
                      <div className="search_popular_item_right">
                        <h3>{num.degree}</h3>
                      </div>
                    </div>

                  </div>
                </Link>
              </div>  
            </>
            );
          })}
        </div>
        <hr className="search_line"></hr>
        <h2 className="search_txt">인기있는 재료 살펴보기</h2>
        <div className="search_material_container">
   
          {materialList.map((num) => {
            return (<>
              <div className="search_material_item">
              
                <div className="search_img">

                  <img src={num.image} alt={num.name} fill="true" sizes="300" />
                
                </div>

                <div className="search_caption">
                 <h2 className="search_material_name">{num.name}</h2>
                </div>
                <div>
                </div>
              </div>
            </>
            )
          })}
        </div>

      </div>
    </>
  )
}