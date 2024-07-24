import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../../../store/store'
import { Api } from '../../../../services/Api'
import { AddDocumentButton } from '../../../../components/manage/AddDocumentButton'


export const Files = () => {
  const [documentosYCarpetas, setDocumentosYCarpetas] = useState<any[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);  const props = useParams<{id: string; id_carpeta: string; nombre_carpeta: string}>();
  const token = useSelector((state: RootState) => state.auth.token);

  const fetchDocumentos = async () => {

    const actividad = {
      id_actividad: props.id
    }


    if (!token && !props.id_carpeta) {
      console.log('Token cannot be null');
      return
    }
    try {
      const response = await Api.postActivitie('ver_archivos', actividad, token);
      const documentos = response.data;

      setDocumentosYCarpetas(documentos);

      if (props.id_carpeta) {
        const idCarpetaNum = parseInt(props.id_carpeta, 10);
        const matchedCarpetas = documentos.filter((carpeta: any) => carpeta.id_carpeta === idCarpetaNum);
        const matchedDocuments = matchedCarpetas.flatMap((carpeta: any) => carpeta.documentos);
        setFilteredDocuments(matchedDocuments);
      } else {
        console.log('id_carpeta is undefined');
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDocumentos();
  }, [props, token]);

  const renderDocumentPreview = (document: any) => {
    const { mime_type, documento_url, nombre } = document;
    
    const getFilePreview = (mimeType: string) => {
      switch (mimeType) {
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
          return <img src={documento_url} alt={nombre} className="preview-image max-h-24" />;
        case 'application/pdf':
          return <div className='w-fit h-fit'>
            <img src="/pdf-icon.png" alt="PDF Icon" className="h-24"/>
          </div>;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return <img src="/excel-logo.png" alt="Excel Icon" className="h-24"/>;
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          return <img src="/ppt-logo.png" alt="PowerPoint Icon" className="h-[65px]"/>;
        default:
          return <span>Archivo no soportado</span>;
      }
    }

    return getFilePreview(mime_type);
  }

  return (
    <div className='w-full h-full'>
      <AddDocumentButton/>
      <div className='h-full w-full '>
        <ul className='grid grid-cols 3 sm:grid-cols-4 lg:grid-cols-5 BP1-5:grid-cols-6 BP2:grid-cols-7 gap-4'>
        {filteredDocuments.map((document: any) => (
            <li key={document.documento_id} className="px-3 justify-center bg-[#F0F0F9] rounded-xl flex flex-col items-center">
              <a href={document.documento_url} target="_blank" rel="noopener noreferrer" className='h-24 flex flex-col items-center justify-center'>
                  {renderDocumentPreview(document)}
              </a>
                <span className='w-28 text-center text-sm text-wrap truncate'>{document.nombre}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
