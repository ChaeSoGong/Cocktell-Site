import { MATERIAL_DATABASE_ID, TOKEN } from "@/config";
import { NextResponse } from "next/server";

export async function POST(request){ //Query한 Custom List 가져오기
    console.log('Server : Material List fetch Start...');
    const req = await request.json();
    // console.log(req);
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Notion-Version': '2022-06-28',
            'Content-type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body : JSON.stringify(req)
    }
    const res = await fetch(`https://api.notion.com/v1/databases/${MATERIAL_DATABASE_ID}/query`,options);
    if (!res.ok){
        throw new Error("데이터 가져오기 실패");
    }
    const data = await res.json();
    const materialList = await data.results.map((material) => ({
        type: material.properties.type.select.name,
        subtype: material.properties.subtype.select.name,
        id: material.properties.id.unique_id.number,
        image: material.cover?.file.url,
        name: material.properties.name.title[0]?.plain_text,
        description: material.properties.description.rich_text[0]?.plain_text,
        degree: material.properties.degree.number,
    }));
    return NextResponse.json(materialList);
}