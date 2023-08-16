'use client'
//recipe 레이아웃. 레시피 클릭 시에 오른쪽 미니 창으로 레시피 간단설명 나옴?
export default function RecipeLayout({children}){
    return(
        <div>
            <Filter></Filter>
            {children}
        </div>
    )
}
export function Filter(){
    return(
        <div className="recipe_filter" style={{backgroundColor:"skyblue"}}>안녕</div>
    )
}