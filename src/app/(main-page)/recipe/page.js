import { cocktailsFETCH, testFETCH } from "@/app/api/route"
import Image from 'next/image'
import Link from "next/link";
export default async function Recipe() {
  const blurURL = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
  const cocktailData = await cocktailsFETCH('GET');

  return (
    <div>
      Recipe에 오신것을 환영합니다<br/>
      다양한 칵테일의 레시피들을 확인해보세요!<br/>
      
      <div className="recipe_container">
        {cocktailData.map((data=>{
          return(
            <div className="recipe_item" key={data.id}>
              <div className="recipe_img">
                <Link href={`/recipe/${data.id}`}>
                  <Image src={`/cocktail/${data.id}.png`} alt={data.name} placeholder="blur" blurDataURL={blurURL}
                  fill={true} sizes="300"></Image>
                </Link>
              </div>
              <div className="recipe_infor_box">
                <div className="recipe_infor">
                  <Link href={`/recipe/${data.id}`}>
                    <div className="recipe_name">{data.name}</div>
                  </Link>
                  <div className="recipe_difficult">상</div>
                </div>
                <div className="recipe_comment">{data.comment}</div>
              </div>
            </div>
          )
        }))}
      </div>
    </div>
  )
}