import React, { useEffect, useState, memo } from 'react';
import { useSelector } from 'react-redux';
import { useOutletContext, useParams } from 'react-router-dom';
import { RootState } from '../../../../store/store';
import { Api } from '../../../../services/Api';
import { AddDocumentButton } from '../../../../components/manage/AddDocumentButton';

const FilesComponent: React.FC = () => {
  const [filteredDocuments, setFilteredDocuments] = useState<any[]>([]);
  const props = useParams<{ id: string; id_carpeta: string; nombre_carpeta: string }>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { onFileSelect } = useOutletContext<{ onFileSelect: (file: any) => void }>();
  const { showPopWindow } = useOutletContext<{ showPopWindow: boolean }>();
  const { onConflictFile } = useOutletContext<{ onConflictFile: (onActive: boolean) => void }>();
  const { onContent } = useOutletContext<{ onContent: (objeto: any) => void }>();

  const fetchDocumentos = async () => {
    const actividad = { id_actividad: props.id };

    if (!token || !props.id_carpeta) {
      console.log('Token or id_carpeta cannot be null');
      return;
    }

    try {
      const response = await Api.postActivitie('ver_archivos', actividad, token);
      const documentos = response.data;

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
  };

  useEffect(() => {
    fetchDocumentos();
  }, [props.id, props.id_carpeta, token]);

  const renderDocumentPreview = (document: any) => {
    const { mime_type, documento_url, nombre } = document;

    const getFilePreview = (mimeType: string) => {
      switch (mimeType) {
        case 'image/png':
        case 'image/jpg':
        case 'image/jpeg':
        case 'image/gif':
          return <img src={documento_url} alt={nombre} className="preview-image max-h-20" />;
        case 'application/pdf':
          return <img src="/pdf-icon.png" alt="PDF Icon" className="h-20" />;
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
          return <img src="/excel-logo.png" alt="Excel Icon" className="h-24" />;
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
          return <img src="/ppt-logo.png" alt="PowerPoint Icon" className="h-[65px]" />;
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          return <img src="/word-logo.png" alt="Word Icon" className="max-h-16" />;
        default:
          return <span>Archivo no soportado</span>;
      }
    };

    return getFilePreview(mime_type);
  };

  return (
    <div className='w-full h-full overflow-y-auto overflow-x-hidden overflow-hidden flex flex-col pt-6'>
      <AddDocumentButton onChange={onConflictFile} onConflict={onFileSelect} value={showPopWindow} onContent={onContent} />
      <div className='w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 BP1-5:grid-cols-6 BP2:grid-cols-7 gap-4'>
        {filteredDocuments.map((document: any) => (
          <div
            key={document.documento_id}
            className="px-3 bg-[#F0F0F9] rounded-xl flex flex-col items-center justify-between relative h-[95%] hover:bg-[#FFFFFF] py-2"
          >
            <div className='h-24 w-full flex flex-col items-center justify-center relative'>
              <div className='h-fit w-fit'>
                {renderDocumentPreview(document)}
              </div>
            </div>
            <span className='flex truncate h-16 items-center justify-center text-center text-sm text-wrap'>{document.nombre}</span>
            <div className='absolute bottom-[50%] top-[45%] right-3 space-x-1'>
              <button
                className='bg-[#d4d3e6] h-fit w-fit p-[3px] rounded-md'
                onClick={() => {
                  onFileSelect(document);
                  onConflictFile(!showPopWindow);
                  onContent({
                    icono: '/error-circle-regular-240.png',
                    texto1: '¿Está seguro de que desea eliminar el archivo?',
                    aviso: 'Eliminar archivo'
                  });
                }}
              >
                <img src="/trash-regular-240.png" alt="Trash Icon" className='h-5 w-5' />
              </button>
              <button className='h-fit w-fit bg-[#d4d3e6] p-[3px] rounded-md'>
                <a href={document.documento_url} target="_blank" rel="noopener noreferrer" download={document.nombre}>
                  <img src="/download-solid-240.png" alt="Download Icon" className='h-5 w-5' />
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Files = memo(FilesComponent);
