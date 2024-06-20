import React from 'react'
import { format, parseISO } from 'date-fns';
export default function EventPopover({ x, y, event, onEdit, onDelete }:any) {
  return (
    <div
      className="absolute bg-white border shadow-lg p-3 rounded"
      style={{ top: y, left: x }}
    >
      <h3 className="font-bold text-xl">{event.title}</h3>
      <p>Data de Início: {format(parseISO(event.start), 'dd/MM/yyyy HH:mm')}</p>
      <p>Data de Fim: {event.end ? format(parseISO(event.end), 'dd/MM/yyyy HH:mm') : 'N/A'}</p>
      <div className="flex gap-2 mt-2">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1 px-2" onClick={onEdit}>Editar</button>
        <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-1 px-2" onClick={onDelete}>Excluir</button>
      </div>
    </div>
  )
}
