type Props = {
    id?: string,
    inside: string
    type?: "submit" | "button",
    color?: string
}

export const CreateBoton = ({id, inside, type, color} : Props) => {
  return (
    <div className="py-6 md:py-8 relative w-full h-auto flex flex-col items-center">
        <button className={`rounded-2xl text-white font-marcellus w-10/12 hover:text-gray-600 h-20 transition duration-200 text-3xl outline-none ${color ?? 'bg-[#A9A9BA] hover:bg-white'}`} type={type ?? "button"}>{inside}</button>
    </div>
  )
}
