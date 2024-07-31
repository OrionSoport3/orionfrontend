import { useState } from "react";

type Props = {
    name: string;
    label: string;
    select: () => void;
}

export const Checkbox = ({ label, name, select }: Props) => {

    const [cambiar, setCambiar] = useState<boolean>(false);

    return (
        <div className="w-full h-full flex items-center space-x-3 truncate bg-gradient-to-r from-5% via-20% to-100% hover:from-slate-200 via-transparent to-transparent py-2 px-2">
            <button type="button" className=" w-full flex items-center space-x-3" name={name} onClick={() => {select(), setCambiar(!cambiar)}}>
                <div className={`w-4 h-4 relative border-slate-500 border-[1px] rounded-[0.17rem] flex flex-col items-center justify-center ${cambiar ? 'bg-slate-500' : ''}`}>
                    <div className={`${cambiar ? '' : 'bg-transparent'}`}></div>
                    {cambiar ? <img src="/palomita_blanca.png" className="" alt="Icono blanco" /> : <></>}
                </div>
                <h1 className="text-[1.2rem] font-manjari -mb-2 truncate">{label}</h1>
            </button>
        </div>
    )
}