"use client";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { EventInput } from "@fullcalendar/core";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal/Modal";
import EventoModal from "./eventos/EventoModal";
import { CheckIcon } from "@heroicons/react/20/solid";
import Dropdown from "./Dropdown/Dropdown";

interface Event {
    id: string;
    title: string;
    start: Date | string;
    end?: Date | string;
}

export default function Calendario() {
    const [view, setView] = useState("multiMonthYear");
    const calendarRef = useRef<FullCalendar | null>(null);
    const [events, setEvents] = useState<EventInput[]>([]);
    const [newEvent, setNewEvent] = useState<Event>({ title: "", start: "", id: "" });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectEvent, setSelectEvent] = useState<any>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);

    const event = {
        id: String(new Date().getTime()),
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
    };

    function handleDateClick(arg: { date: Date; allDay: boolean }) {
        setNewEvent({ ...newEvent, start: arg.date, id: String(new Date().getTime()) });
        setShowCreateModal(true);
    }

    const handleViewChange = (selectedOption: any) => {
        setView(selectedOption.value);
    };

    const handleEventClick = (clickInfo: any) => {
        setSelectEvent(clickInfo.event);
        setShowViewModal(true);
    };

    const handleEventClose = () => {
        setSelectEvent(null);
        setShowCreateModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const eventToAdd = {
            ...newEvent,
            id: String(new Date().getTime()),
        };
        setEvents([...events, eventToAdd]);
        setShowCreateModal(false);
        setNewEvent({
            title: "",
            start: "",
            id: "",
        });
    }    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });
    };

    function handleDeleteEvent() {
        if (idToDelete !== null) {
            setEvents(events.filter(event => event.id !== idToDelete));
            setShowDeleteModal(false);
            setIdToDelete(null);
            setShowViewModal(false);
        }
    }

    const handleAddEventButtonClick = () => {
        setNewEvent({
            title: "",
            start: new Date(), 
            id: String(new Date().getTime()),
        });
        setShowCreateModal(true);
    };
    
    useEffect(() => {
        // Exemplo de uso: chamando updateSize ao inicializar o componente
        if (calendarRef.current) {
            calendarRef.current.getApi().updateSize();
        }
    }, []);

    // Função para lidar com eventos de redimensionamento da janela ou mudanças no contêiner do calendário
    const handleWindowResize = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().updateSize();
        }
    };

    // Adicionar um listener de evento de redimensionamento de janela
    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);
    return (
        <>
            <main className="flex items-center justify-center">
                <div className="md:w-[80vw] md:h-[80vh] w-screen">
                    <div className="">
                        <FullCalendar
                        ref={calendarRef}
                            plugins={[
                                dayGridPlugin,
                                interactionPlugin,
                                timeGridPlugin,
                                multiMonthPlugin,
                            ]}
                            buttonText={{
                                today: "Hoje",
                                month: "Mês",
                                week: "Semana",
                                day: "Dia",
                                year: "Ano",
                            }}
                            customButtons={{
                                addEventButton: {
                                    text: "Adicionar Evento",
                                    click: handleAddEventButtonClick, 
                                }
                            }}
                            headerToolbar={{
                                left: "addEventButton",
                                center: "title",
                                right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay prev,next",
                            }}
                            events={events}
                            nowIndicator={true}
                            editable={true}
                            droppable={true}
                            selectable={true}
                            selectMirror={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            locale={"pt-br"}
                        />
                        {showViewModal && (
                            <Modal closeModal={handleEventClose}>
                                <EventoModal
                                    events={selectEvent}
                                    onClose={handleEventClose}
                                    onDelete={() => {
                                        setIdToDelete(selectEvent.id);
                                        setShowDeleteModal(true);
                                    }}
                                />
                            </Modal>
                        )}

                        {showCreateModal && (
                            <Modal closeModal={handleEventClose}>
                                <div className="bg-white rounded-xl p-10">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                                            Criar Evento
                                        </h3>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                                                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                                    sm:text-sm sm:leading-6"
                                                    value={newEvent.title}
                                                    onChange={handleChange}
                                                    placeholder="Título"
                                                />
                                                <input
                                                    type="datetime-local"
                                                    name="start"
                                                    className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 
                                                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                                    sm:text-sm sm:leading-6"
                                                    value={newEvent.start.toString()}
                                                    onChange={handleChange}
                                                />
                                                <input
                                                    type="datetime-local"
                                                    name="end"
                                                    className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 
                                                    shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                                    sm:text-sm sm:leading-6"
                                                    value={newEvent.end?.toString()}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button
                                                    type="submit"
                                                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2 disabled:opacity-25"
                                                    disabled={newEvent.title === ""}
                                                >
                                                    Criar
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                                    onClick={handleEventClose}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Modal>
                        )}
                        {showDeleteModal && (
                            <Modal closeModal={() => setShowDeleteModal(false)}>
                                <div className="bg-white rounded-xl p-10">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900">Excluir Evento</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Tem certeza que deseja excluir este evento?
                                        </p>
                                    </div>
                                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:col-start-2"
                                            onClick={handleDeleteEvent}
                                        >
                                            Excluir
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                                            onClick={() => setShowDeleteModal(false)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}