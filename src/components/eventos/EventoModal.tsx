import React from 'react'

export default function EventModal({ events, onClose }: any) {
  return (
      <div className='bg-neutral-50 p-5 rounded shadow z-50 flex flex-col justify-center items-center gap-3 w-[30rem]'>
        <h2 className="font-bold text-2xl border-b w-full text-center uppercase pb-2">{events.title}</h2>
        <div>
          <label className='inline font-semibold text-lg'>Data de Início: </label>
          {events.start.toLocaleString()}
        </div>
        <div>
          <label className='inline font-semibold text-lg'>Data de Fim: </label>
          {events.end.toLocaleString()}
        </div>
        <button className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg py-2 px-3" onClick={onClose}>Fechar</button>
      </div>
  )
}