import { Checkbox } from "../components/Checkbox"

type Props = {
    modelo: string,
    imgUrl: string,
}

export const CarroSeleccionable = ({modelo, imgUrl} : Props) => {

  return (
    <div className='bg-[#A9A9BA] rounded-2xl p-4'>
        <div className="w-auto h-auto flex flex-col items-center">
            <div className="flex space-x-5 w-full  items-center justify-center">
                <Checkbox />
            </div>
            <img src={imgUrl}  />
        </div>
    </div>
  )
}
