// src/pages/home.tsx
import React from 'react';
import Link from 'next/link';

const Home = () => {
    return (
        <main className='w-full h-screen flex flex-col justify-center items-center'>
            <div className='border p-10 rounded-lg shadow-2xl'>
                <h1 className='text-2xl text-center py-5 font-semibold'>Escolha uma opção</h1>
                <div className='flex flex-col justify-center items-center gap-3 '>
                    <Link href={"/agendamento"}><button className='bg-sky-800 px-4 py-2 rounded-md text-white hover:bg-sky-700 w-[180px] '>Agendamento</button></Link>
                    <Link href={"/calendario"}><button className='bg-sky-800 px-4 py-2 rounded-md text-white hover:bg-sky-700 w-[180px]'>Calendario</button></Link>
                </div>
            </div>
        </main>
    );
};

export default Home;