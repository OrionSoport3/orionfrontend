import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { select } from "../store/form";

type Props = {
    name: string,
}

export const ItemSeleccionable = ({name}: Props) => {
    
    const dispatch = useDispatch();
    const isSelected = useSelector((state: any) =>
      state.select.items.find((item: any) => item.name === name)?.isSelected
    );
  
    const selected = () => {
      dispatch(select(name));
    };
    
    return (
    
    <button className={`w-auto h-8 rounded-full  shadow-lg flex flex-row items-center px-4 outline-none my-1 ${isSelected ? 'bg-gris text-white' : 'hover:bg-gray-200 transition-all duration-150 bg-white'} `} onClick={selected}>
        <img src="/X.png" className={` pointer-events-auto ${isSelected ? 'hidden h-0 w-0 overflow-hidden' : 'visible h-6 w-[24px]'}`}/>
        <img src="/X-white.png" className={` ${isSelected ? 'visible h-6 w-[24px]' : 'h-0 w-0 overflow-hidden hidden'}`} />
        <div className={`w-[1px] h-6 ${isSelected ? 'bg-white' : 'hover:bg-white bg-black transition-all duration-150'}`}></div>
        <h3 className="pl-3">{name}</h3>
    </button>
  )
}
