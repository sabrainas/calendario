import React, { useState } from 'react'
import { dadosArmazenados } from './Evento';

export default function AddEventModal({ addEvent, onClocse }: any) {
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        description: '',
    })

    const handleChange = (event: any) => {
        const {name, value} = event.target;
        setNovoEvento({...novoEvento, [name]: value});
    }

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if(novoEvento.title && novoEvento.start && novoEvento.end){
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            if(startDate >= endDate){
                alert('A data de início não pode ser maior que a data de fim');
                return;
            }
            addEvent(novoEvento);
            setNovoEvento({
                title: '',
                start: '',
                end: '',
                description: '',
            })
        }

        const dados = {
            title: novoEvento.title,
            start: novoEvento.start,
            end: novoEvento.end,
            description: novoEvento.description
        }
        dadosArmazenados(dados)
    }

    return (
        <div className='w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-0 flex justify-center items-center z-50'>
            <div className='bg-neutral-50 p-5 rounded shadow z-50 flex flex-col justify-center items-center gap-3'>
                <h3 className='text-xl'>Adicionar Evento</h3>
                <form action="" onSubmit={handleSubmit} className='flex flex-col gap-4 pt-5'>
                    <div className='flex flex-col gap-1'>
                        <label>Título do evento:</label>
                        <input type="text" placeholder='Digite o título' name="title" className='py-1 px-2 rounded border border-gray-200' value={novoEvento.title} onChange={handleChange} />
                    </div>

                    <hr></hr>

                    <div className='flex flex-col gap-1'>
                        <label>Início:</label>
                        <input type="datetime-local" placeholder='Digite a data' className='py-1 px-2 rounded border border-gray-200 ' name="start" value={novoEvento.start} onChange={handleChange} />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label>Fim:</label>
                        <input type="datetime-local" placeholder='Digite a data' className='py-1 px-2 rounded border border-gray-200 ' name="end" value={novoEvento.end} onChange={handleChange} />
                    </div>

                    <div className='flex justify-between'>
                        <button type="submit" className='bg-pink-500 rounded py-1 px-2 w-20 text-gray-100 hover:bg-lime-800' style={{ marginTop: '10px', float: 'right' }}>Salvar</button>

                    </div>
                </form>
            </div>
        </div>
    )
}
