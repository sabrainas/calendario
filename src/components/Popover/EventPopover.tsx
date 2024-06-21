import React from "react";
import { format, parseISO, isValid, formatISO } from "date-fns";

interface EventPopoverProps {
    x: number;
    y: number;
    event: any;
    onEdit: () => void;
    onDelete: () => void;
}

const EventPopover: React.FC<EventPopoverProps> = ({ x, y, event, onEdit, onDelete }) => {
    const start = typeof event.start === 'string' ? event.start : formatISO(event.start);
    const end = typeof event.end === 'string' ? event.end : formatISO(event.end);

    return (
        <div
            className="absolute bg-white shadow-lg p-4 rounded"
            style={{ top: y, left: x }}
        >
            <h3 className="font-bold text-xl">{event.title}</h3>
            <p>Data de Início: {format(parseISO(start), 'dd/MM/yyyy HH:mm')}</p>
            <p>Data de Fim: {end ? format(parseISO(end), 'dd/MM/yyyy HH:mm') : 'N/A'}</p>
            <div className="flex gap-2 mt-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-1 px-2" onClick={onEdit}>
                    Editar
                </button>
                <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg py-1 px-2" onClick={onDelete}>
                    Excluir
                </button>
            </div>
        </div>
    );
};

export default EventPopover;