"use client"
import Calendario from '@/components/Calendario'
import { NextUIProvider } from '@nextui-org/react';

export default function Home() {

  return (
    <>
      <NextUIProvider>
        <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
          <h1 className="font-bold text-2xl text-gray-700">Agenda</h1>
        </nav>

        <Calendario />
      </NextUIProvider>
    </>
  )
}