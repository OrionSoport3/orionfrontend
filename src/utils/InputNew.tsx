import { Field } from "formik";
import React from "react";

type InputComponentProps = {
    name: string;
    id?: string;
    placeholder?: string;
    error?: string;
    type: "text" | "date" | "password" | "email";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    errorStyle?: string;
    texto: string;
    css?: string;
    center?: string;
    rows?: number
    cols?: number
};

export const InputNew = ({
    texto,
    onChange,
    type,
    value,
    error,
    name,
    errorStyle,
    id,
    placeholder,
    css,
    cols,
    rows,
    center,
}: InputComponentProps) => {
    return (
        <div className={`flex flex-col py-2 w-full px-2 ${center ?? 'items-center'}`}>
            <div className="flex flex-row w-full">
                <label htmlFor="text" className="text-xl text-black w-2/5">
                    {texto}:
                </label>
                <Field
                    value={value}
                    as= "textarea"
                    rows={rows ?? 1}
                    cols={cols ?? 1}
                    onChange={onChange}
                    typeof={type ?? 'text'}
                    name={name}
                    id={id}
                    className={`bg-white w-full rounded-full md:rounded-lg outline-none px-3 border-gray-300 border-2 ${css ?? 'h-8 md:h-9'} py-1`}
                    placeholder={placeholder}
                    style={{ lineHeight: '1.5' }}
                />
            </div>
            <div className="flex flex-row w-full items-center">
                {error && <small className={`text-red-500 text-base font-bold mt-2 ${errorStyle && 'BP1:hidden visible'}`}>{error}</small>}
            </div>
        </div>
    );
};
