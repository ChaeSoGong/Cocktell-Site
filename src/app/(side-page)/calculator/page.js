'use client'
// import next from "next/types";
import {useState, useRef, useEffect} from "react";

export default function Calculator(){  

  const [resultContent,setResultContent] = useState(null); // 결과 내용
  const alcoholInput = useRef([]);
  const amountInput = useRef([]);
  const[nextId, setNextId] = useState(3);
  // const[calcState,setCalcState] = useState(false); // 결과인지 아닌지

  const [inputItems, setInputItems] = useState([
    { 
      id:1,
      degree:0,
      amount:0
    },
    { 
      id:2,
      degree:0,
      amount:0
    }
  ])

  const AddInput = () =>{
    if(inputItems.length<10){
      const input = {
        id : nextId,
        degree : 0,
        amount : 0,
      };
      const newInputItem = [...inputItems];
      // console.log(newInputItem,"new")
      // console.log(inputItems,"origin")
      newInputItem.push(input);
      setInputItems(newInputItem);
      // console.log(inputItems+"yeh")
      setNextId(nextId+1);
    }   
    else{
      alert("재료는 최대 10개까지 가능합니다.")
    }
  }

  const DeleteInput = (event) => {
    const newInputItem = [...inputItems];
  
    const result = newInputItem.filter((item)=>(item.id)!=event.target.value)
    // console.log(event.target.value+"가 삭제됨")
    setInputItems(result)
  }
 




  const subInput = () => {
    const sub = document.getElementById('sub');

    inputItems.map(item=>{
      console.log(item)
    })
    //계산하기버튼 숨기기
    // event.preventDefault();
    //제출 할 때 경고하기
    //여기에 도수 중 100이 넘는애가 있으면 경고하게
    // 도수, 양 0보다 작을 때 경고하기(음수 일 경우)
    // sumAmount는 0이면 안된다.
    let sum = 0;
    let sumAmount = 0;
    let isOver =  false;
    let isZero = false;

    inputItems.map((item)=>{
  
      sum += item.degree * item.amount
      sumAmount += item.amount
      if(item.degree>1){

      }
      if(item.degree > 100 || item.degree<0){
        alcoholInput.current[item.id].focus();
        isOver = true;
        
      }
      else if(item.amount<0){
        amountInput.current[item.id].focus();
        isOver = true;
      }
      
    })
    if(sumAmount === 0 ) {
      isZero = true;
    }

    if(isOver){
      return alert("올바른 범위의 값을 입력하세요")
    }
    else if(isZero){
      return alert("총 양이 0보다 커야 합니다.")
    }
    else{
      sub.style.display = 'none';

      setResultContent(<>
      <div className="result_container">
      <div className="result_box">
      <h2 className="result_txt_1">칵테일 알코올 도수</h2>
      <div className="result_output_container">
      <span className="result_output">
      {(sumAmount).toFixed(1)+"ml"}
      </span>
      <span className="result_output">{(sum/sumAmount).toFixed(2)+"%"}
      </span>
      </div>
      <h2 className="result_txt_2">이 칵테일은</h2>
      <div className="result_compare_container">
        <div className="result_compare_box">
          <span className="ex1">
            <h2>소주</h2>
            <h3>(16.5도 기준)</h3>
          </span>
          <span className="ex2">
            <span className="result_compare_output">{(sum/16.5/355).toFixed(2)}</span>
            <h3>병</h3>
          </span>
        </div>
        <div className="result_compare_box">
         <span className="ex1">
            <h2>맥주</h2>
            <h3>(4.6도 작은 캔 기준)</h3>
          </span>
          <span className="ex2">
            <span className="result_compare_output">{(sum/4.6/250).toFixed(2)}</span>
            <h3>캔</h3>
          </span>
        </div>
      </div>
      <div className="result_txt_3">
      <h2>과 같습니다.</h2>
      <h2>지나친 음주는 건강에 해롭습니다.</h2>
      </div>

      {/* <button onClick={replay}>다시 하기</button> */}
      </div> </div>
      <div className="result_replay_container">
      {/* <button onClick={replay}>다시 하기</button> */}
      <a href="/calculator" className="result_replay">다시 계산하기</a>
      </div>
    </> 
      )
    
    }

}

// const replay = () => {
//   inputItems.splice(0,inputItems.length)
//   var newInputItem = [...inputItems]
//   newInputItem.splice(0,newInputItem.length)
//   var newInputItem = 
//   [{
//       id : 1,
//       degree : 0,
//       amount : 0
//     },
//     {
//       id : 2,
//       degree : 0,
//       amount : 0
//     }]
//   console.log(newInputItem,"rre");

//   setInputItems(newInputItem);
//   console.log(inputItems,"input");
    

//   setResultContent(null);
// }


  const changeInput = (event) => {

    // console.log(event.target.id)
    if(event.target.name === "degree"){
    inputItems.map((item,i)=>{
      if(item.id === Number(event.target.id)){
        var newInputItem = [...inputItems]
        // console.log(newInputItem,"?")
        newInputItem.splice(i,1,{
          id : item.id,
          degree : Number(event.target.value),
          amount : item.amount
        })
        setInputItems(newInputItem)
        // console.log(inputItems,"origin")

      } //if 끝
    }) //map 끝
  } // degree 끝

  else if(event.target.name === "amount"){
    inputItems.map((item,i)=>{
      if(item.id === Number(event.target.id)){
        var newInputItem = [...inputItems]
        // console.log(newInputItem,"?")
        newInputItem.splice(i,1,{
          id : item.id,
          degree : item.degree,
          amount : Number(event.target.value)
        })
        setInputItems(newInputItem)
        // console.log(newInputItem,"new")
        // console.log(inputItems,"origin")
      } //if 끝
    }) //map 끝
  }//amount 끝

  }

  return(
  <div className="calc_box">
    <h2 className="calc_logo">칵테일 도수 계산기</h2>
    {inputItems.map((item)=>{
            return (
            <div key={item.id} className="calc_input_box">
              <span className="calc_input_border">
              <input className="calc_input_box_item"  name="material" type="text" placeholder="재료 (선택)"/>
              <input className="calc_input_box_item" id={item.id} name="degree" type="number" min="0" max={100} placeholder="도수 (%)" onChange={changeInput} ref={el => alcoholInput.current[item.id] = el}/>
              <input className="calc_input_box_item" id={item.id} name="amount" type="number" min="0" placeholder="양 (ml/oz)" onChange={changeInput} ref={el => amountInput.current[item.id] = el}/>
            </span>
            <span className="calc_x">
            {item.id < 3 && <h2 className="calc_none">o</h2>}
              {item.id >= 3 &&
              <button key={item.id} onClick={DeleteInput} value={item.id}>X</button>
            }
            </span>
            </div>
            );
    })}
    <div className="calc_add_container">
      <div className="calc_add_button_container">
      <input type = "button" onClick={AddInput} value ="+ 재료 추가" className="calc_add_button"/>
      </div>
    </div>
      
      <div className="calc_submit_button_container">
      {/* <input type = "submit" onClick={subInput} value="계산하기" className="calc_submit_button"/> */}
      <input type = "button" onClick={subInput} value="계산하기" className="calc_submit_button" id='sub'/>
      </div>
      {resultContent}

      
      
  </div>



  );
}