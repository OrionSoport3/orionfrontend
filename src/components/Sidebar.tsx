import { Checkbox } from "./Checkbox"

export const Sidebar = () => {
  return (
    <div className=" w-[15rem]">
        <h1 className=" text-black font-bold text-3xl border-b-2 border-black pb-3 font-marcellus">FILTRAR</h1>
        <div className="pt-6">
            <h3 className="font-josefin text-xl font-bold">Fecha</h3>
          <div className="flex justify-center mt-3">
            <form action="">
            <input type="date" className="rounded-lg p-2 w-auto h-9 shadow-lg"/>
          </form>
          <button className="h-auto w-auto px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg text-white justify-end ml-5 hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer" type="submit">Consultar</button> 
          </div>
          <h3 className="font-josefin text-xl font-bold mt-6">Nombre del proyecto</h3>
            <form action="">
              <div className="flex mt-3 justify-start">
                <input className="bg-white rounded-lg w-40 h-9 pl-2 outline-none shadow-lg " type="text" placeholder="Buscar.."/>
                <button className="h-auto w-auto px-2 py-1 bg-gradient-to-r from-blue-button to-black rounded-lg
                text-white justify-end ml-5 hover:bg-gradient-to-r hover:from-morado-señor hover:to-azul-de-mujer transition ease-in-out duration-500"
                type="submit">Buscar</button>
              </div>
            </form> 
          <h3 className="font-josefin text-xl font-bold mt-6">Empresas</h3>
          <form action="">
            <div className="flex mt-3 justify-start">
              <Checkbox/> <h3 className='ml-3'>Pico Energy</h3>
            </div>
            <div className="flex mt-3 justify-start">
              <Checkbox/> <h3 className='ml-3'>WeatherFord</h3>
            </div>
          </form>
        </div>
        
    </div>

  )
}
