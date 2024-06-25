import { useState } from "react";

type BaseProps = {
    name: string;
    id?: string;
    placeholder?: string;
    error?: string;
    type: "text" | "date" | "password" | "email";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    errorStyle?: string;
    texto: string;
    incheck?: boolean;
    css?: string;
    center?: string;
};

type IncheckTrueProps = BaseProps & {
    incheck: true;
    options: string[];
    label: string;
    onSelect: (value: string) => void;
};

type IncheckFalseProps = BaseProps & {
    incheck?: false;
    options?: never;
    label?: never;
    onSelect?: never;
};

type Props = IncheckTrueProps | IncheckFalseProps;

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
    incheck,
    onSelect,
    label,
    options,
    css,
    center,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        if (onSelect) {
            onSelect(option);
        }
    };

    return (
        <div className={`flex flex-col
         py-2 w-full px-2 ${center ?? 'items-center'}`}>
            <div className="flex flex-row w-full">
            <label htmlFor="text" className=" text-xl text-black w-2/5">
                {texto}:
            </label>
            {incheck ? (
                <div className="relative w-full">
                    <button
                        type="button"
                        className={`w-full inline-flex justify-between items-center bg-white border-2 border-gray-300 ${selectedOption ? 'text-black' : 'text-gray-400'}  md:smartwatch:w-[200px] md:w-full rounded-full md:rounded-lg h-8 md:h-9 outline-none px-3`}
                        id="options-menu"
                        aria-expanded="true"
                        aria-haspopup="true"
                        onClick={toggleDropdown}
                    >
                        {selectedOption ? selectedOption : label}
                        <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    {isOpen && (
                        <div
                            className={`origin-center absolute items-center z-50 mt-2 w-full`}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <div className="py-1 bg-white rounded-2xl BP1:rounded-md border-2 border-gray-300 h-[150px] overflow-y-auto">
                                {(options ?? []).map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleOptionClick(option)}
                                        className="block px-4 py-2 text-sm hover:bg-gray-800 hover:text-white w-full text-left"
                                        role="menuitem"
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <input
                value={value}
                onChange={onChange}
                type={type ?? 'text'}
                name={name}
                id={id}
                className={`bg-white w-full rounded-full md:rounded-lg outline-none px-3 border-gray-300 border-2 ${css ?? 'h-8 md:h-9'} py-1`}
                placeholder={placeholder}
                style={{ lineHeight: '1.5' }}
              />
            )}
            </div>
            <div className="flex flex-row w-full items-center">
            {error && <small className={`text-red-500 text-base font-bold mt-2 ${errorStyle && 'BP1:hidden visible'}`}>{error}</small>}
            </div>
        </div>
    );
};
