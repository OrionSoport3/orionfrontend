import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../../store/store'
import { Api } from '../../../../services/Api'
import { AddDocumentButton } from '../../../../components/manage/AddDocumentButton'

type Props = {
    nombre?: string
}

export const Files = ({nombre}: Props) => {
  const nombreCarpeta = useParams<{nombre_carpeta: string}>();
  const id_carpeta = useParams<{id_carpeta: string}>();
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchDocumentos = async () => {
    if (!token) {
      console.log('Token cannot be null');
    }
    try {
    } catch (error) {
      
    }
  }

  return (
    <div className='w-full h-full bg-white'>
      <AddDocumentButton />
    </div>
  )
}
