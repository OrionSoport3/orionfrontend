import { useState } from "react";
import { BigBoton } from "./BigBoton";

type Props = {
    label: string;
    estado: Record<string, boolean>;
    select: (valor: string) => void;
};

export const Subboton = ({ label, select, estado }: Props) => {
    const [isBig, setIsBig] = useState<boolean>(false);

    const handleClick = () => {
        select(label);
        setIsBig(prev => !prev);
    };

    if (estado.TODOS) {
        return label === "TODOS" ? (
            <BigBoton selection={handleClick} label={label} />
        ) : (
            <button
                type="button"
                name={label}
                onClick={handleClick}
                className="flex justify-center items-center BP1:bg-gradient-to-r BP1:from-blue-button BP1:to-black w-auto p-2 BP1:p-0 BP1:w-48 BP1:h-12 BP1:rounded-xl
                BP1:hover:bg-gradient-to-r BP1:hover:from-morado-señor BP1:hover:to-azul-de-mujer text-black BP1:text-white font-josefin text-min sm:text-base BP1:text-xl
                transition-color duration-200 BP1:hover:w-[220px] BP1:hover:h-[70px] hover:text-sm sm:hover:text-xl BP1:hover:text-2xl truncate">
                {label}
            </button>
        );
    }

    if (estado[label]) {
        return (
            <BigBoton
                label={label}
                selection={handleClick}
            />
        );
    }

    return (
        <button
            type="submit"
            name={label}
            onClick={handleClick}
            className={`flex justify-center items-center BP1:bg-gradient-to-r BP1:from-blue-button BP1:to-black w-auto p-2 BP1:p-0 BP1:w-48 BP1:h-12 BP1:rounded-xl
            BP1:hover:bg-gradient-to-r BP1:hover:from-morado-señor BP1:hover:to-azul-de-mujer text-black BP1:text-white font-josefin text-min sm:text-base BP1:text-xl
            transition-color duration-200 BP1:hover:w-[220px] BP1:hover:h-[70px] hover:text-sm sm:hover:text-xl BP1:hover:text-2xl truncate ${
                isBig ? "active-class" : ""
            }`}
        >
            {label}
        </button>
    );
};
