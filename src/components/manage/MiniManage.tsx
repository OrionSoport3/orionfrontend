import { Link } from "react-router-dom"

type Props = {
    texto: string,
    img: string,
    img2: string,
    link: string,
}

export const MiniManage = ({texto, img, img2, link}: Props) => {
  return (
    <Link to={link} className='hover:bg-morrado group relative w-full h-full text-black hover:text-white flex items-center justify-center'>
        <div className="flex flex-row items-center justify-start w-3/4 h-full space-x-4 ">
            <div>
                <img src={img} className="h-6 w-6 block group-hover:hidden"/>
                <img src={img2} className="h-6 w-6 hidden group-hover:block"/>
            </div>
            <h2 className="font-manjari font-semibold text-[1.05rem]">{texto}</h2>
        </div>
    </Link>
  )
}
