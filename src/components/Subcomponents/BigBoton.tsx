type Props = {
    label: string,
    selection: (valor: string) => void;
}

export const BigBoton = ({label, selection}: Props) => {
    return (
        <button type="submit" onClick={() => {selection(label)}} className="flex justify-center items-center BP1:bg-gradient-to-r BP1:from-blue-button BP1:to-black w-auto p-2 h-10 BP1:w-48 BP1:h-16 rounded-xl 
        BP1:hover:bg-gradient-to-r BP1:hover:from-morado-señor BP1:hover:to-azul-de-mujer BP1:text-white font-josefin text-min sm:text-base BP1:text-2xl 
        transition-all duration-200 BP1:hover:w-[210px] BP1:hover:h-[80px] hover:text-base BP1:hover:text-3xl after:-ml-[38px] hover:after:-ml-[64px] after:w-10 hover:after:w-[69px] sm:after:w-20 sm:after:-ml-[68px] sm:after:mt-12 after:bg-blue-950 
        after:h-1 after:rounded-xl after:mt-8 after:block BP1:after:-ml-none BP1:after:hidden BP1:after:bg-none BP1:after:h-0 BP1:after:rounded-none
        BP1:after:mt-auto">
        {label}
        </button>
    )
}