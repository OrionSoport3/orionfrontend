import { useEffect } from "react"

type Props = {
    documentName: string,
    texto1: string,
    texto2: string,
    icono: string,
    aviso: string,
    onAccept: () => void,
    onCancel: () => void,
}


export const PopWindow = ({documentName, onAccept, onCancel, aviso, icono, texto1, texto2}: Props) => {
  return (
    <div className='absolute bg-[rgba(0,0,0,0.5)] h-screen w-screen z-50 flex flex-col items-center justify-center'>
        <div className='w-[40rem] h-auto bg-white rounded-2xl flex justify-center '>
            <div className="w-full h-fit flex flex-col p-5 items-center">
                <div className="w-full h-full flex items-center">
                    <div className="h-full flex flex-col items-center px-3">
                        <img src={icono} alt="Warning Icon" className='h-[35px]'/>
                    </div>
                    <div className="w-fit">
                        <h1 className='font-bold'>{aviso}</h1>
                        <h1 className="text-wrap truncate text-start">{texto1} "{documentName}" {texto2}</h1>              
                    </div>
                </div>
                <div className='w-5/6 h-full flex justify-between items-center my-4 space-x-5'>
                    <button onClick={onAccept} className='bg-[#a2a7b6] outline outline-1 h-full py-2 w-1/2 rounded-xl hover:bg-[#727684]'>SI</button>
                    <button onClick={onCancel} className='bg-[#c5cad9] h-full py-2 w-1/2 rounded-xl hover:bg-[#727684]'>NO</button>
                </div>
            </div>

        </div>
    </div>
  )
}
