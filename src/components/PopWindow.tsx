type Props = {
    documentName: string,
    onAccept: () => void,
    onCancel: () => void,
}


export const PopWindow = ({documentName, onAccept, onCancel}: Props) => {
  return (
    <div className='absolute bg-[rgba(0,0,0,0.5)] h-screen w-screen z-50 flex flex-col items-center justify-center'>
        <div className='w-[40rem] h-auto bg-white rounded-2xl flex'>
            <div className='py-5 flex flex-col items-center justify-center px-10'>
                <div className='w-full h-full flex flex-row justify-start items-center space-x-3'>
                    <img src="/error-regular-240.png " alt="Warning Icon" className='h-9 w-9'/>
                    <div>
                        <h1 className='font-bold'>Advertencia</h1>
                        <h1> El archivo "{documentName}" ya se encuentra en el sistema. ¿Desea reemplazarlo?</h1>              
                    </div>
                </div>
                <div className='w-full h-full flex justify-between my-4 space-x-5'>
                    <button onClick={onAccept} className='bg-[#a2a7b6] outline outline-1 h-full py-2 w-1/2 rounded-xl hover:bg-[#727684]'>SI</button>
                    <button onClick={onCancel} className='bg-[#c5cad9] h-full py-2 w-1/2 rounded-xl hover:bg-[#727684]'>NO</button>
                </div>
            </div>
        </div>
    </div>
  )
}
