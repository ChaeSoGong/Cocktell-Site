import { RECIPE_DATABASE_ID, TOKEN } from "@/config";
import { NextResponse } from "next/server";

export async function GET(request, response){
    console.log('Server : One Recipe fetch Start...');
    // console.log(props) {params:{id:'2'}}
    const options = {
        cache:'no-store',
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body:JSON.stringify({
            page_size:1,
            filter:{
                "property":"id",
                "number":{"equals": Number(response.params.id)}
            }
        })
    }
    const res = await fetch(`https://api.notion.com/v1/databases/${RECIPE_DATABASE_ID}/query`,options);
    if (!res.ok){
        throw new Error("데이터 가져오기 실패");
    }
    const dataObject = await res.json();
    // console.log(dataObject.results[0])
    const recipeData = {
        image : dataObject.results[0].cover?.file.url,
        level : dataObject.results[0].properties.level.select.name,
        degree : dataObject.results[0].properties.degree.number,
        mainmaterial : dataObject.results[0].properties.mainmaterial.multi_select.map(item=>item.name),
        submaterial : dataObject.results[0].properties.submaterial.multi_select.map(item=>item.name),
        garnish : dataObject.results[0].properties.garnish.multi_select.map(item=>item.name),
        glass: dataObject.results[0].properties.glass.select?.name,
        skill: dataObject.results[0].properties.skill.multi_select.map((skill) => (skill.name)),
        taste: dataObject.results[0].properties.taste.multi_select.map((taste) => (taste.name)),
        name : dataObject.results[0].properties.name.title[0]?.plain_text,
        comment : dataObject.results[0].properties.comment.rich_text[0]?.plain_text,
        description : dataObject.results[0].properties.description.rich_text[0]?.plain_text,
        createdate: dataObject.results[0].properties.createdate.created_time
    }
    return NextResponse.json(recipeData);
/*     const cocktailList = await data.results.map((cocktail) => ({
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
    })); */
    // return NextResponse.json("hi");
}

/* export async function POST(request, response){ //Query한 Recipe List 가져오기
    console.log('Server : One Recipes fetch Start...');
    // const filterConfig = await    request.json();
    const props = await response;
    const id = props.params.id;
    console.log(id)
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body:JSON.stringify({
            page_number:1,
            filter:{
                "property":"id",
                "number":{"equals": Number(id)}
            }
        }),
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
} */