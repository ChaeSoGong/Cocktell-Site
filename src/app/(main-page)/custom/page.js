import { getCustomData } from "../../../../휴지통/custom.get";
import { cocktailsFETCH } from "../../../../휴지통/route"
import { blurURL } from "@/config";
import Image from 'next/image'
import Link from "next/link";
import {AiFillHeart} from "react-icons/ai";
import {AiOutlineHeart} from "react-icons/ai";


export default async function CustomRecipe() {
  const cocktailPromise = await fetch('http://localhost:3000/api/customdata',{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      page_size:12,
      filter:{
        "property":"type",
        "select":{"equals":"Custom"}
      }
    })
  })
  const cocktailData = await cocktailPromise.json();
  // const cocktailData = await cocktailPromise;
  return (
      <div className="custom_container">
        {cocktailData.map((data=>{
          return(
            <div className="custom_item" key={data.id}>

              <div className="custom_img_box">
                <div className="custom_img">
                    <Link href={`/recipe/${data.id}`}>
                      <Image src={data.image} alt={data.name} placeholder="blur" blurDataURL={blurURL}
                      fill={true} sizes="265"></Image>
                    </Link>
                </div>
                <div className="custom_caption">
                  <div className="custom_caption_item">
                    <h3>자세히 보기</h3>
                  </div>
                </div>
              </div>

              <div className="custom_infor_box">
                <div className="custom_infor">
                  <div className="custom_name">{data.name}</div>
                </div>
                <div className="custom_comment">{data.comment}</div>
                <div className="custom_detail">
                  <div className="custom_difficulty">
                    난이도
                    <span style={{margin:"0 4px"}}></span>
                    <div className="custom_star text-yellow-500">
                      {data.level==='1' ? "★☆☆☆☆":null}
                      {data.level==='2' ? "★★☆☆☆":null}
                      {data.level==='3' ? "★★★☆☆":null}
                      {data.level==='4' ? "★★★★☆":null}
                      {data.level==='5' ? "★★★★★":null}
                    </div>
                  </div>
                  <div className="custom_heart text-gray-600 mr-1">
                    <AiOutlineHeart/>
                    <span className="ml-2">{data.degree}</span>
                    </div>
                </div>
              </div>
            </div>
          )
        }))}
      </div>
  )
}