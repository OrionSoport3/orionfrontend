export const Checkbox  = () => {
    return (
        <div>
            <input type="checkbox" className="before:content[''] peer relative h-4 w-4 cursor-pointer appearance-none rounded
              border border-blue-button transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-8 before:w-8 
              before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity
               checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"/>
        </div>
    )
}