
type Props = {
  label: string;
  name: string;
  id?: string;
  placeholder?: string;
  error?: string;
  type: "text" | "date" | "password"  | "email";
  inside: string ;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  value?: string | number;
  css?: string,
  csslabel?: string,
}

export const InputLogin = ({label, name, id, placeholder, error, type, inside, onChange, value, css, csslabel}: Props) => {

  return (
    <div className={` ${css ?? 'w-full  flex flex-col px-5 md:px-2 relative pt-2 md:mt-2'}`}>
      <label htmlFor={label}
      className={`${csslabel ?? 'w-full text-white font-josefin text-xl nose:text-base md:text-xl py-2 md:py-3 pl-2 nose:mt-0 mt-2 truncate'}`}>
        {inside}
      </label>
      <input value={value} onChange={onChange} type={type ?? 'text'} name={name} id={id} className="bg-white md:smartwatch:w-[200px] w-auto md:w-full rounded-full md:rounded-lg h-8 md:h-9 outline-none shadow-lg px-3" placeholder={placeholder}/>
      {error && <small className="text-red-500 text-base font-bold mt-2">{error}</small>}
    </div>
  )
}
