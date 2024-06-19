"use client"
import Calendario from '@/components/Calendario'

export default function Home() {

  return (
    <>
      <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
        <h1 className="font-bold text-2xl text-gray-700">Agenda</h1>
      </nav>

      <Calendario />

    </>
  )
}