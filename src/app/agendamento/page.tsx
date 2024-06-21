import React from "react";
import MiniCalendar from "@/components/Calendario/MiniCalendar";

const Agendamento = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl text-gray-700 mb-4">Agendamento</h1>
      <MiniCalendar />
      <form className="mt-4 p-4 bg-gray-100 rounded-xl w-80">
        <h2 className="font-semibold text-lg mb-2">Restrições para doação de sangue</h2>
        <div className="flex items-center mb-2">
          <input type="checkbox" id="tatuagem" name="tatuagem" />
          <label htmlFor="tatuagem" className="ml-2">
            Possui tatuagem nos últimos 2 anos?
          </label>
        </div>
        {/* Outras restrições podem ser adicionadas aqui */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Verificar disponibilidade
        </button>
      </form>
    </div>
  );
};

export default Agendamento;