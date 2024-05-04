import Image from 'next/image'
import { blurURL } from '@/config';
import Link from "next/link";

// 데이터 전체 가져오기

export default async function Result(props) {

    const searchKey = props.params.result //검색어 여기에 들어감
    const afterStr = decodeURIComponent(searchKey) //decode된 검색어

    const cocktailPromise = await fetch('http://localhost:3000/api/allcocktaildata', {
        method: 'POST', headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
            "filter": {
                "and": [//기본으로 Cocktell 레시피만 보여줌
                    { "property": "type", "select": { "equals": "Cocktell" } },
                    {
                        "or": [
                            { "property": "name", "rich_text": { "contains": afterStr } },
                            { "property": "comment", "rich_text": { "contains": afterStr } },
                            { "property": "description", "rich_text": { "contains": afterStr } },
                            { "property": "mainmaterial", "multi_select": { "contains": afterStr } },
                            { "property": "submaterial", "multi_select": { "contains": afterStr } },
                            { "property": "garnish", "multi_select": { "contains": afterStr } }
                        ]
                    }]
            }
        })
    })
    const CustomPromise = await fetch('http://localhost:3000/api/allcocktaildata', {
        method: 'POST', headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
            "filter": {
                "and": [//기본으로 Cocktell 레시피만 보여줌
                    { "property": "type", "select": { "equals": "Custom" } },
                    {
                        "or": [
                            { "property": "name", "rich_text": { "contains": afterStr } },
                            { "property": "comment", "rich_text": { "contains": afterStr } },
                            { "property": "description", "rich_text": { "contains": afterStr } },
                            { "property": "mainmaterial", "multi_select": { "contains": afterStr } },
                            { "property": "submaterial", "multi_select": { "contains": afterStr } },
                            { "property": "garnish", "multi_select": { "contains": afterStr } }
                        ]
                    }]
            }
        })
    })



    const cocktailList = await cocktailPromise.json();
    const customList = await CustomPromise.json();

    return (
        <div>
            <div className='search_result_txt'>
                <h2>{`'${afterStr}'`}</h2>
                <h3>에 대한 검색 결과</h3>
            </div>
            <div className='search_result_container'>
                {cocktailList.length === 0 && customList.length === 0 && <h2 className='search_result_noTxt'>검색하신 결과가 없습니다.</h2>}
                {cocktailList.length !== 0 && cocktailList.map((item) => {
                    return (<>
                        <div className='search_result_item'>
                            <div className='search_result_item_left'>

                                <div className='search_result_image_box'>
                                    <Link href={`/recipe/${item.id}`}>
                                        <Image src={item.image} alt={item.name} fill="true" placeholder="blur" blurDataURL={blurURL} sizes='800' ></Image>
                                    </Link>
                                </div>
                                <div className="search_result_caption">
                                    <h3>자세히 보기</h3>
                                </div>

                            </div>
                            <div className='search_result_item_right'>
                                <div className='search_result_item_plus'>
                                    <div className='search_result_item_top'>
                                        <div className='search_result_top_nameLevel'>
                                            <Link href={`/recipe/${item.id}`}>
                                                <h2>{item.name}</h2>
                                            </Link>

                                            <div className='search_result_item_level'>
                                                <h3>난이도</h3>
                                                <div className="search_result_item_star text-yellow-500">
                                                    {item.level === '1' ? "★☆☆☆☆" : null}
                                                    {item.level === '2' ? "★★☆☆☆" : null}
                                                    {item.level === '3' ? "★★★☆☆" : null}
                                                    {item.level === '4' ? "★★★★☆" : null}
                                                    {item.level === '5' ? "★★★★★" : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='search_result_top_comment'>
                                            <h4>{item.comment}</h4>
                                        </div>
                                    </div>
                                    <div className='search_result_item_bottom'>
                                        <h5>Recipe 페이지에 있는 칵테일입니다.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                })}
                {customList.length !== 0 && customList.map((item) => {
                    return (<>
                        <div className='search_result_item'>
                            <div className='search_result_item_left'>

                                <div className='search_result_image_box'>
                                    <Link href={`/recipe/${item.id}`}>
                                        <Image src={item.image} alt={item.name} fill="true" placeholder="blur" blurDataURL={blurURL} sizes='800' ></Image>
                                    </Link>
                                </div>
                                <div className="search_result_caption">
                                    <h3>자세히 보기</h3>
                                </div>

                            </div>
                            <div className='search_result_item_right'>
                                <div className='search_result_item_plus'>
                                    <div className='search_result_item_top'>
                                        <div className='search_result_top_nameLevel'>
                                            <Link href={`/recipe/${item.id}`}>
                                                <h2>{item.name}</h2>
                                            </Link>

                                            <div className='search_result_item_level'>
                                                <h3>난이도</h3>
                                                <div className="search_result_item_star text-yellow-500">
                                                    {item.level === '1' ? "★☆☆☆☆" : null}
                                                    {item.level === '2' ? "★★☆☆☆" : null}
                                                    {item.level === '3' ? "★★★☆☆" : null}
                                                    {item.level === '4' ? "★★★★☆" : null}
                                                    {item.level === '5' ? "★★★★★" : null}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='search_result_top_comment'>
                                            <h4>{item.comment}</h4>
                                        </div>
                                    </div>
                                    <div className='search_result_item_bottom'>
                                        <h5>Custom 페이지에 있는 칵테일입니다.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                })}
            </div>
        </div>
    )
}
