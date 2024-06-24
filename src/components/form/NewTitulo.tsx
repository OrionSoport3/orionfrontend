import React from 'react'

type Props = {
    texto: string,
}

export const NewTitulo = ({texto}: Props) => {
  return (
    <div className='border-b border-gray-400'>
        <h1 className='font-marcellus font-bold text-3xl pb-3'>
            {texto}
        </h1>
    </div>
  )
}
