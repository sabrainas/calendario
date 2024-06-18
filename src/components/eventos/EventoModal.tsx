import React from 'react'

export default function EventoModal({ events, onDelete }: any) {
  if (!events) {
    return null;
  }

  return (
    <div className='bg-neutral-50 p-5 rounded-xl shadow z-50 flex flex-col justify-center items-center gap-3 w-[30rem]'>
      <h2 className="font-bold text-2xl border-b w-full text-center pb-2">Nome do evento: {events.title}</h2>
      <div>
        <label className='inline font-semibold text-lg'>Data de Início: </label>
        {events.start.toLocaleString()}
      </div>
      <div>
        <label className='inline font-semibold text-lg'>Data de Fim: </label>
        {events.end ? events.end.toLocaleString() : 'N/A'}
      </div>
      <div className='flex gap-5'>
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-3" onClick={onDelete}>Excluir</button>
      </div>
    </div>
  )
}
