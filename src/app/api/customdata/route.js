import { RECIPE_DATABASE_ID, TOKEN } from "@/config";
import { NextResponse } from "next/server";

/** **Develop by 임채윤**  
 * Notion DB에 있는 Custom Recipe Data들을 가져오는 API입니다.  
 * GET으로 가져오면 Recipe를 가져옵니다.  
 * POST로 가져오면 query를 거친 Recipe List를 가져옵니다.
 * 
 * 정렬 혹은 필터링을 하여 Cocktails Data를 가져올 수 있습니다.  
 * 포함정보 : type(칵텔 or 커스텀), id(고유ID), image(칵테일 사진),  
 * name(칵테일 이름), comment(한줄평), description(설명), taste(맛;배열),  
 * degree(알코올 도수), level(난이도 1~5), glass(잔), skill(기법;배열),  
 * materials(재료; main, sub, garnish가 각각 배열로 저장됨), createdate(생성날짜)
*/

export async function POST(request, response){ //Query한 Custom List 가져오기
    console.log('Server : Custom List fetch Start...');
    const filterConfig = await request.json();
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body : JSON.stringify(filterConfig)
    }
    const res = await fetch(`https://api.notion.com/v1/databases/${RECIPE_DATABASE_ID}/query`,options);
    if (!res.ok){
        throw new Error("데이터 가져오기 실패");
    }
    const data = await res.json();
    const cocktailList = await data.results.map((cocktail) => ({
        type: cocktail.properties.type.select.name,
        image: cocktail.cover?.file.url,
        id: cocktail.properties.id.unique_id.number,
        name: cocktail.properties.name.title[0]?.plain_text,
        comment: cocktail.properties.comment.rich_text[0]?.plain_text,
        description: cocktail.properties.description.rich_text[0]?.plain_text,
        taste: cocktail.properties.taste.multi_select.map((name) => (name.name)),
        degree: cocktail.properties.degree.number,
        level: cocktail.properties.level.select?.name,
        glass: cocktail.properties.glass.select?.name,
        skill: cocktail.properties.skill.multi_select.map((skill) => (skill.name)),
        materials: {
            main: cocktail.properties.mainmaterial.multi_select.map(main => main.name),
            sub: cocktail.properties.submaterial.multi_select.map(sub => sub.name),
            garnish: cocktail.properties.garnish.multi_select.map(garnish => garnish.name)
        },
        createdate: cocktail.properties.createdate.created_time
    }));
    return NextResponse.json(cocktailList);
}