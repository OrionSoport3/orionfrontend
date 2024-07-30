type Props = {
    value: string
}

export const Checkbox = ({value}: Props) => {
    return (
        <div className="w-full h-fit flex items-center space-x-3 truncate bg-gradient-to-r from-5% via-20% to-100% hover:from-slate-200 via-transparent to-transparent py-2 px-2">
            <button className="h-fit w-full flex items-center">
                <img src="/checkbox-regular.png" alt="Icon Selected" className="w-5 h-5"/>
                <h1 className="text-[1.2rem] font-manjari ">{value}</h1>
            </button>
        </div>
    )
}