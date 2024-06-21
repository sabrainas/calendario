"use client";
import React from 'react'
import CalendarioComponent from '@/components/Calendario/CalendarioComponent'

export default function Calendario() {
    return (
        <>
            <nav className="flex justify-between mb-12 border-b border-violet-100 p-4">
                <h1 className="font-bold text-2xl text-gray-700">Agenda</h1>
            </nav>

            <CalendarioComponent />
        </>
    )
}
