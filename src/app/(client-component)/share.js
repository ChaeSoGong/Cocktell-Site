'use client'
import { BsShareFill } from "react-icons/bs";

export default function Share(){
    const CopyURL = () => {
        if (typeof window !== 'undefined') {
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(window && window.location.href)
              .then(() => {
                alert("클립보드에 복사되었습니다.")
              })
              .catch(() => {
                alert("다시 시도하세요.");
              })
          }
        }
      }
    return(<><BsShareFill className="recipe_detail_bottom_name_icon" onClick={CopyURL}/></>)
}