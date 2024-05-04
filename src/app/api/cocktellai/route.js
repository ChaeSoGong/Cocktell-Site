import { OEPNAI_KEY, OPENAI_ID } from '@/config';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

/** **Develop by 임채윤**  
 * Chat GPT Open AI를 사용하여 칵테일을 추천받는 API입니다.  
 * home Page Component에 있는 CocktellAI Component에서 사용합니다.   
*/

const openai = new OpenAI({
    apiKey:OEPNAI_KEY,
    organization:OPENAI_ID
});
export async function POST(request, response){
    console.log('Server : AI Response Start...')
    const body = await request.json();
    const prompt = `my mood :"${body.order}"`
    const systemConfig = "You are kind.Recommend a cocktail that suits mood. Answers are summarized and translate into Korean. and export JSON"
    const answerForm = '{ "answer" : { "recommendCocktail" : "Magarita, "description" : "풋풋함이 떠오르는 상큼한 칵테일입니다." }}'
    const res = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        temperature: 0.7,
        messages: [
            {role: "system", content:systemConfig},
            {role: "assistant", content:answerForm},
            {role: "user",content: prompt},
        ],
        max_tokens:150, 
    });
    const result = JSON.parse(res.choices[0].message.content);
    if (result){
        return NextResponse.json(result);
    }
    else return NextResponse.json("AI 기능이 실패하였습니다.");
}

// const response = await openai.listEngines(); //Chat GPT 엔진 리스트 출력