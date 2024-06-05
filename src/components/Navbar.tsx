export const Navbar = () => {
  return (
    <div className="w-screen bg-transparent text-black justify-center">
        <div className="flex flex-row xl:w-2/5 w-7/12 justify-between lg:p-3 items-center">
            <img src="../logo_orion.jpg" className="w-10 h-10 ml-5 mr-0"/>
            <div className="font-josefin lg:font-bold lg:text-chosen text-sm truncate"><a href="">Historial de servicios</a></div>
            <div className=""><a href="">Compañías</a></div>
            <div className=""><a href="">Servicios</a></div>
            <div className=""><a href="">Personal</a></div>
        </div>
        <div className="w-11/12 border-b-2 ml-10 pt-1 border-black"></div>
    </div>
  )
}