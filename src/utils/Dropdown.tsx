import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  label: string;
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Llamamos a onSelect con la opción seleccionada
  };

  return (
    <div className="relative w-full inline-block text-left px-4 BP1:px-2 pt-7 space-y-3 md:mt-2">
        <label className='w-full text-white font-josefin text-xl nose:text-base md:text-xl md:py-3 pl-2 nose:mt-0 mt-2 truncate' htmlFor='Departamento'>Escoja un departamento</label>
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-3xl BP1:rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 "
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
      </div>

      {isOpen ? 
      <div
          className=" origin-center absolute items-center z-50 h-auto mt-2 w-[89%] px-3 BP1:px-2 rounded-2xl BP1:rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        :
        <div
          className="absolute h-[0px] hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
        </div>
        }
    </div>
  );
};

export default Dropdown;
