import { AddFolderButton } from "../../../components/manage/AddFolderButton"
import { FolderButton } from "../../../components/manage/FolderButton"

export const Archivos = () => {
  return (
    <div className="w-full h-full">
        <div className="w-full flex flex-row items-center justify-center">
            <h2 className="font-NATS text-4xl">ARCHIVOS DEL SERVICIO</h2>
        </div>
        <div className="flex flex-row space-x-4 items-center h-16">
            <FolderButton/>
            <FolderButton/>
            <FolderButton/>
            <AddFolderButton/>
        </div>
    </div>
  )
}
