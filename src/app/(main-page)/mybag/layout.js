//Server Component
export default function MyBagLayout({ children }) {
    return (
        <div>
            <Logo></Logo> {/*  Develop by 임채윤 */}
            {children}
        </div>  
    )
}

//Develop by 임채윤
function Logo() {
    return (
      <a href="/mybag">
        <div className="flex flex-col items-center mt-28 mb-16 select-none">
          <h2 className="text-5xl w-fit mb-8 font-[600]">냉장고</h2>
          <h3 className="text-lg w-fit">갖고있는 재료를 찾아보세요</h3>
        </div>
      </a>
    )
  }