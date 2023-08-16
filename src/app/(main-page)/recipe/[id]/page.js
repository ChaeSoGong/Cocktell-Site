import { cocktailsFETCH } from '@/app/api/route'
import Image from 'next/image'
export default async function Recipe(props) {
  const id = props.params.id;
  const cocktailData = await cocktailsFETCH('GET', id)
  return (
    <div>
      이 페이지는 {props.params.id}번째 칵테일입니다.
      <div className='w-80 h-fit border-4 border-black'>
        <Image src={`/cocktail/${props.params.id}.png`} priority={true} alt={props.params.id} width={320} height={320} style={{
        "width":"auto",
        "height":"auto",
        "objectFit":"fill"
      }}></Image>
      </div>
      <div>이름 : {cocktailData.name}</div>
      <div>한줄평 : {cocktailData.comment}</div>
      <div>설명 : {cocktailData.description}</div>
      <div>주재료 : {cocktailData.materials.base}</div>
      <div>부재료 : {cocktailData.materials.body}</div>
      <div>장식(Garnish) : {cocktailData.materials.garnish}</div>
      <div>도수 : {cocktailData.alcohol+"도"}</div>
      <div>잔 : {cocktailData.glass+"글라스"}</div>
      <div>기법 : {cocktailData.skill}</div>
   
    </div>
  )
}