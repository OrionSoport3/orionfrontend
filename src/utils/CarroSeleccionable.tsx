type Props = {
    modelo: string,
    imgUrl: string,
    chequeado: boolean,
    value: string,
    toggleChecked: () => void,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CarroSeleccionable = ({modelo, imgUrl,value, toggleChecked, chequeado} : Props) => {

  return (
    <button type="button" onClick={toggleChecked} className={`rounded-2xl flex flex-col h-full p-4 ${chequeado ? 'bg-[#3D445A]' : 'bg-[#a9a9b3] hover:bg-[#b6b6ba] transition-all duration-150'}`}>
        <div className="w-auto flex flex-col h-full items-end justify-between">
            <div className="flex space-x-5 w-full relative justify-center items-end">
              <div className="flex flex-row justify-center items-center">
                <img src="../checkbox-regular.png" className={`${chequeado ? 'hidden w-[0px] h-[0px]' : 'w-[30px] h-[30px] visible'}`}/>
                <img src="../check-blanco.png" className={`${chequeado ? 'visible w-[30px] h-[30px]' : 'hidden w-[0px] h-[0px]'}`} />
                <h2 className={`font-alumni-sans text-4xl font-medium pl-3 ${chequeado ? 'text-white': 'text-black'}`}>{modelo}</h2>
                </div>
            </div>
            <img src={imgUrl} className="w-auto h-auto items-end bottom-0" />
        </div>
    </button>
  )
}
