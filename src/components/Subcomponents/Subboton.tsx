export const Subboton = ({children}) => {
    return (
        <a className="flex justify-center items-center bg-gradient-to-r from-blue-button to-black w-48 h-12 rounded-xl
        hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer text-white font-josefin text-xl
        ease-in-out transition duration-1000" href="#">
            {children}
        </a>
    )
}