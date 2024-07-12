import { Field } from "formik";

type InputComponentProps = {
    name: string;
    id?: string;
    placeholder?: string;
    error?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    errorStyle?: string;
    texto: string;
    type?: 'text' | 'date';
    css?: string;
    center?: string;
    rows?: number
    cols?: number
};

export const InputDate = (
    {
        texto,
        type,
        onChange,
        value,
        error,
        name,
        errorStyle,
        id,
        placeholder,
        css,
        center,
    }: InputComponentProps
) => {
  return (
    <div className={`flex flex-col w-full px-2 ${center ?? 'items-center'}`}>
            <div className="flex flex-col w-full items-center justify-center">
                <label htmlFor="text" className="text-xl text-white font-josefin w-full" >
                    {texto}:
                </label>
                <Field
                    value={value}
                    onChange={onChange}
                    type={type ?? 'date'}
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
  )
}
