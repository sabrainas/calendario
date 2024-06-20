import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';

export default function EventoModal({ events, onClose, onDelete, onUpdate }:any) {
  const [title, setTitle] = useState(events.title);
  const [start, setStart] = useState(events.start);
  const [end, setEnd] = useState(events.end);

  const handleUpdate = () => {
    const updatedEvent = {
      ...events,
      title,
      start,
      end,
    };
    onUpdate(updatedEvent);
    onClose();
  };

  if (!events) {
    return null;
  }

  return (
    <div className='bg-neutral-50 p-10 rounded-xl shadow z-50 flex flex-col justify-center items-center gap-3 w-[30rem]'>
      <h2 className="font-bold text-2xl border-b w-full text-center pb-2">Editar Evento</h2>
      <div className='w-full'>
        <label className='inline font-semibold text-lg'>Nome do Evento: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded-lg p-2 w-full'
        />
      </div>
      <div className='w-full'>
        <label className='inline font-semibold text-lg'>Data de Início: </label>
        <input
          type="datetime-local"
          value={format(parseISO(start), "yyyy-MM-dd'T'HH:mm")}
          onChange={(e) => setStart(e.target.value)}
          className='border rounded-lg p-2 w-full'
        />
      </div>
      <div className='w-full'>
        <label className='inline font-semibold text-lg'>Data de Fim: </label>
        <input
          type="datetime-local"
          value={end ? format(parseISO(end), "yyyy-MM-dd'T'HH:mm") : ''}
          onChange={(e) => setEnd(e.target.value)}
          className='border rounded-lg p-2 w-full'
        />
      </div>
      <div className='flex gap-5'>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-3" onClick={handleUpdate}>Salvar</button>
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-2 px-3" onClick={onDelete}>Excluir</button>
      </div>
    </div>
  );
}