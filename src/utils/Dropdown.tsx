import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  label?: string;
  error?: string,
  onSelect: (value: string) => void;
  errorStyle?: string,
}

const Dropdown: React.FC<DropdownProps> = ({ options, label, onSelect, error, errorStyle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative w-full px-2">
        <label className='w-full text-white font-josefin text-xl nose:text-base md:text-xl pl-2 nose:mt-0 truncate' htmlFor='Departamento'>Escoja un departamento</label>
      <div>
        <button
          type="button"
          className="w-full inline-flex justify-between items-center bg-white text-gray-500 md:smartwatch:w-[200px] md:w-full rounded-full md:rounded-lg h-8 md:h-9 outline-none shadow-lg px-3"
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
          className={`origin-center absolute items-center z-50 rounded-lg h-[120px] overflow-y-auto mt-2 w-full`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1 bg-white shadow-lg ">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 w-full text-left"
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
      {error && <small className={`text-red-500 text-base font-bold mt-2 ${errorStyle && 'BP1:hidden visible'}`}>{error}</small>}
      </div>

  );
};

export default Dropdown;
