export const Checkbox  = () => {
    return (
        <div className="relative">
            <input type="checkbox" className="before:content[''] peer h-4 w-4 cursor-pointer appearance-none rounded
              border-2  border-black checked:border-[#A3A3A3] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 
              before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity duration-75
               checked:bg-transparent checked:bg-[#A3A3A3] checked:before:bg-transparent hover:before:opacity-10 absolute"/>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" className="fill-[rgba(0, 0, 0, 1)] transform left-0 -top-[1px] absolute"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
        </div>
    )
}