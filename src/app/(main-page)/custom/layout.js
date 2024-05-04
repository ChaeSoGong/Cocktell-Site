//Server Component
export default function CustomLayout({children}){
    return(
        <div>
            <Logo></Logo>
            {children}
        </div>
    )
}
export function Logo(){
    return(
        <div className="flex flex-col items-center mt-28 mb-16 select-none">
            <h2 className="text-5xl w-fit mb-8 font-[600]">커스텀 레시피</h2>
            <h3 className="text-lg w-fit">여러분들의 아이디어를 공유하세요!</h3>
        </div>
    )
}