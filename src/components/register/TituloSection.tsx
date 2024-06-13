type Props = {
    contenido: string
}

export const TituloSection = ({contenido}: Props) => {
  return (
    <div className="w-full h-auto flex flex-row justify-start items-center px-4 md:px-3">
    <div className="border-l-4 border-white pl-6 h-full mt-2"></div>
    <h3 className="font-josefin text-white text-lg md:text-2xl text-bold mt-5 ">{contenido}</h3>              
  </div>
  )
}
