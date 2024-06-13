type Props = {
    texto : string,
    ruta: string
}

export const Subboton = ({texto, ruta} : Props) => {
    return (
        <a className="flex justify-center items-center BP1:bg-gradient-to-r BP1:from-blue-button BP1:to-black w-auto p-2 BP1:p-0 BP1:w-48 BP1:h-12 BP1:rounded-xl
        BP1:hover:bg-gradient-to-r BP1:hover:from-morado-señor BP1:hover:to-azul-de-mujer text-black BP1:text-white font-josefin text-min sm:text-base BP1:text-xl
        transition-color duration-200 BP1:hover:w-[220px] BP1:hover:h-[70px] hover:text-sm sm:hover:text-xl BP1:hover:text-2xl truncate" href={ruta}>
            {texto}
        </a>
    )
}