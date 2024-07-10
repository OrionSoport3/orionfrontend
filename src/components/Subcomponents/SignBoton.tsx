
type Props = {
  color?: string;
  type: "submit" | "button" | "reset",
  inside: string,
}

export const SignBoton = ({color, type, inside}: Props) => {
  return (
    <div className="py-6 md:py-8 relative ">
        <button className={`rounded-2xl text-white font-josefin w-40 md:w-64 
        hover:text-black h-10 transition duration-200 ${color ?? 'bg-blue-950 hover:bg-blue-300'}`} type={type ?? "button"}>{inside}</button>
    </div>
  )
}