import { toast } from "sonner"

type Props = {
    id?: string,
    inside: string
    type?: "submit" | "button"
}

export const SignBoton = ({id, inside, type} : Props) => {
  return (
    <div className="py-6 md:py-8 relative ">
        <button className="rounded-2xl text-white font-josefin w-40 md:w-64 bg-blue-950 hover:bg-blue-300
        hover:text-black h-10 transition duration-200" type={type ?? "button"}>{inside}</button>
    </div>
  )
}