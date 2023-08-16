import React, {useState} from "react";

export function Calculator(){
    const [inputItems, setInputItems] = useState([
        {id:1, degree:0, amount:0},
    ])
    const [id, setId] = useState(1);
    const[nextId, setNextId] = useState(2);
    const AddInput = () =>{
        const input = {
            id_: nextId,
            degree_ : '',
            amount_ : ''
        };
        const newInputItem = [{...inputItems}] ;
        newInputItem.push(input);
        setInputItems(newInputItem);
        setId(id+1);
        setNextId(nextId+1);
        console.log(inputItems)
    }

    return(
        <>
        <div className="calc_txt">칵테일 도수 계산기</div>
        
        {inputItems.map((item, index)=>{
            return (<>
            <div>
            <input type="text" placeholder="(선택)"></input>
            <input type="number" placeholder="도수"></input>
            <input type="number" placeholder="양"></input>
            </div>
            </>
            );
        })}
        <input type = "button" onClick={AddInput} value ="버튼"></input>

        </>
    );
};

