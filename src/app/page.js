//Hompage is Server Component
import Home from './(client-component)/home';

export default async function Page() {
  const recipeData = await fetch("http://localhost:3000/api/recipedata",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      page_size:6,
      sorts:[{"property":"taste","direction":"ascending"}],
      filter:{"property":"type","select":{"equals":"Cocktell"}}
    })
  })
  const recipeList = await recipeData.json();
  const customData = await fetch("http://localhost:3000/api/customdata",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      page_size:3,
      filter:{"property":"type","select":{"equals":"Custom"}}
    })
  })
  const customList = await customData.json();
  const materialData = await fetch("http://localhost:3000/api/materialdata",{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      page_size:100
    })
  })
  const materialList = await materialData.json();
  return (
    <div className='home_page'> {/* Home Component : Client Component */}
      <Home data={{
        recipeData: recipeList,
        customData: customList,
        materialData:materialList,
      }} />
      <div className="mt-40 mb-40 border-b border-gray-300"></div>
    </div>
  );
};