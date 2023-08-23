import { RECIPE_DATABASE_ID, TOKEN } from "@/config";
import { NextResponse } from "next/server";

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