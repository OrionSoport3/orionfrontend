import { Navbar } from '../components/Navbar.tsx'
import { Sidebar } from '../components/Sidebar.tsx';
import { Subnavbar } from '../components/Subnavbar.tsx';

const Welcome = () => {
  return (
    <div className="fixed w-screen h-screen bg-design-one bg-no-repeat bg-contain bg-fixed text-black bg-colores-pantalla">
    <div className=''>
      <Navbar />
    </div>
    <div className='flex p-10'>
      <div className='hola'>
          <Sidebar />
      </div>

      <div className='w-5/6 pl-12 pr-5'>
        <Subnavbar/>
      </div>
    </div>
  </div>
  )
};

export default Welcome;