"use client";

import React, { useState } from "react";
import MiniCalendar from "@/components/Calendario/MiniCalendar";

const Agendamento = () => {
  const [events, setEvents] = useState<any>([]);

  const addEvent = (event: any) => {
    setEvents([...events, event]);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* formulario de restrição  */}
      <form className="mt-4 p-4 bg-gray-100 rounded-xl w-80">
        <h2 className="font-semibold text-lg mb-2">Perguntas para triagem de agendamento de sangue (marque as que forem verdadeiras para você)</h2>
        <div className="flex flex-col items-center mb-2">
          <div>
            <input type="checkbox" id="boaSaude" name="boaSaude" className="mr-2" />
            <label htmlFor="boaSaude">Não me considero em um bom estado de saúde para doar sangue</label>
          </div>

          <div>
            <input type="checkbox" id="doacaoMasculino" name="doacaoMasculino" className="mr-2" />
            <label htmlFor="doacaoMasculino">Doei sangue há menos de 2 meses (sexo biológico masculino)</label>
          </div>

          <div>
            <input type="checkbox" id="doacaoFeminino" name="doacaoFeminino" className="mr-2"/>
            <label htmlFor="doacaoFeminino">
              Doei sangue há menos de 4 meses (sexo biológico feminino)
            </label>
          </div>

          <div>
            <input type="checkbox" id="estetico" name="estetico" className="mr-2"/>
            <label htmlFor="estetico" >
              Coloquei brinco/piercing ou fiz tatuagens/maquiagens definitivas nos últimos 6 meses
            </label>
          </div>

          <div>
            <input type="checkbox" id="acupuntura" name="acupuntura" className="mr-2"/>
            <label htmlFor="acupuntura">
              Fiz acupuntura nos últimos 6 meses
            </label>
          </div>

          <div>
            <input type="checkbox" id="contatoRisco" name="contatoRisco" className="mr-2"/>
            <label htmlFor="contatoRisco">
              Tive contato com alguem de risco nos últimos 12 meses
            </label>
          </div>

        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Verificar disponibilidade
        </button>
      </form>

      <h1 className="font-bold text-2xl text-gray-700 mb-4">Agendamento</h1>
      <MiniCalendar addEvent={addEvent} />

      {/* ver eventos agendados  */}
      <div className="mt-4">
        <h2 className="font-bold text-xl text-gray-700">Eventos Agendados</h2>
        <ul>
          {events.map((event: any, index: any) => (
            <li key={index}>
              {event.date.toLocaleDateString()} - {event.slot}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Agendamento;