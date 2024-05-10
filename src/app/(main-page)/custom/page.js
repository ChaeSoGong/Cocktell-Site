'use client'
//Server Component
import { blurURL } from "@/config";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";
import {AiOutlineHeart} from "react-icons/ai";

export default function CustomRecipe() {  
  const [cocktailData, setCocktailData] = useState([]);
  useEffect(() => {
    const getRecipe = async () => {
      let options = { //*const로 적혀있어서 값이 변경되지 않는 대참사가 일어났었음 2시간 투자함*
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: 12,
          filter: {
            "property": "type",
            "select": { "equals": "Custom" }
          }
        })
      }
      const dataPromise = await fetch('/api/customdata', options);
      setCocktailData(await dataPromise.json());
    }
    getRecipe();
  },[]);

  //   const customAPI = await import("../../api/customdata/route.js");
  //   const customPromise = await customAPI.serverPOST({
  //     page_size:12,
  //     filter:{
  //       "property":"type",
  //       "select":{"equals":"Custom"}
  //     }
  //   })
  // const cocktailData = await customPromise.json();
  return (
      <div className="custom_container">
        {cocktailData ? cocktailData?.map((data=>{
          return(
            <div className="custom_item" key={data.id}>

              <div className="custom_img_box">
                <div className="custom_img">
                  {/* 두번쨰 */}
                    <Link href={`/recipe/${data.id}`}>
                      <img src={data?.image} alt={data.name} sizes="265"></img>
                    </Link>
                </div>
                <div className="custom_caption"> 
                {/* //첫번째  & 두번쟤 & 3세번쨰*/}
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
        })) : undefined}
      </div>
  )
}