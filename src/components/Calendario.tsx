import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import Modal from "./Modal/Modal";
import EventoModal from "./eventos/EventoModal";
import { CheckIcon } from "@heroicons/react/20/solid";
import { format, formatISO, parseISO } from 'date-fns';
import { CgDanger } from "react-icons/cg";
import EventPopover from "./Popover/EventPopover";

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
    const [newEvent, setNewEvent] = useState<Event>({ title: "", start: new Date(), id: "" });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectEvent, setSelectEvent] = useState<Event | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showConflictModal, setShowConflictModal] = useState(false);
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [popover, setPopover] = useState<{ visible: boolean, x: number, y: number, event: Event | null }>({ visible: false, x: 0, y: 0, event: null });

    const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
        setNewEvent({ ...newEvent, start: arg.date.toISOString(), id: String(new Date().getTime()) });
        setShowCreateModal(true);
    };

    const handleViewChange = (selectedOption: any) => {
        setView(selectedOption.value);
    };

    const handleEventClick = (clickInfo: EventClickArg) => {
        setSelectEvent({
            id: clickInfo.event.id,
            title: clickInfo.event.title,
            start: clickInfo.event.start?.toISOString() || "",
            end: clickInfo.event.end?.toISOString(),
        });
        setShowViewModal(true);
    };

    const handleEventClose = () => {
        setSelectEvent(null);
        setShowCreateModal(false);
        setShowViewModal(false);
        setShowDeleteModal(false);
        setShowConflictModal(false);
    };

    const handleEventUpdate = (updatedEvent: any) => {
        setEvents((prevEvents) =>
            prevEvents.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const eventToAdd = {
            ...newEvent,
            id: String(new Date().getTime()),
        };

        // Verificação de conflito de horário
        const conflict = events.some((event) => {
            const eventStart = new Date(event.start as string);
            const eventEnd = new Date(event.end as string || event.start as string);
            const eventToAddStart = new Date(eventToAdd.start);
            const eventToAddEnd = new Date(eventToAdd.end as string || eventToAdd.start);

            return (
                (eventStart <= eventToAddStart && eventEnd >= eventToAddStart) ||
                (eventStart <= eventToAddEnd && eventEnd >= eventToAddEnd)
            );
        });

        if (conflict) {
            setShowConflictModal(true); // Show a modal indicating a conflict
        } else {
            setEvents([...events, eventToAdd]);
            setShowCreateModal(false);
            setNewEvent({
                title: "",
                start: "",
                id: "",
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEvent({
            ...newEvent,
            [e.target.name]: e.target.value,
        });
    };

    const handleDeleteEvent = () => {
        if (idToDelete !== null) {
            setEvents(events.filter((event) => event.id !== idToDelete));
            setShowDeleteModal(false);
            setIdToDelete(null);
            setShowViewModal(false);
        }
    };

    const handleAddEventButtonClick = () => {
        setNewEvent({
            title: "",
            start: new Date().toISOString(),
            id: String(new Date().getTime()),
        });
        setShowCreateModal(true);
    };

    const handleEditEvent = (updatedEvent: Event) => {
        setEvents(events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)));
        setShowViewModal(false);
    };

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().updateSize();
        }
    }, []);

    const handleWindowResize = () => {
        if (calendarRef.current) {
            calendarRef.current.getApi().updateSize();
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    function dayjs(arg0: string): any {
        throw new Error("Function not implemented.");
    }

    const handleMouseEnter = (e: any, event: any) => {
        const rect = e.target.getBoundingClientRect();
        setPopover({
            visible: true,
            x: rect.left,
            y: rect.top + window.scrollY,
            event: event,
        });
    };

    const handleMouseLeave = () => {
        setPopover({ visible: false, x: 0, y: 0, event: null });
    };

    return (
        <>
            <main className="flex items-center justify-center">
                <div className="md:w-[80vw] md:h-[80vh] w-screen">
                    <div className="">
                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, multiMonthPlugin]}
                            buttonText={{ today: "Hoje", month: "Mês", week: "Semana", day: "Dia", year: "Ano" }}
                            customButtons={{ addEventButton: { text: "Adicionar Evento", click: handleAddEventButtonClick } }}
                            headerToolbar={{ left: "addEventButton", center: "title", right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay prev,next" }}
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
                                        if (selectEvent) {
                                            setIdToDelete(selectEvent.id);
                                            setShowDeleteModal(true);
                                        }
                                    }}
                                    onUpdate={handleEventUpdate}
                                />
                            </Modal>
                        )}

                        {events.map((event) => (
                            <div
                                key={event.id}
                                onMouseEnter={(e) => handleMouseEnter(e, event)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {event.title}
                            </div>
                        ))}

                        {popover.visible && popover.event && (
                            <EventPopover
                                x={popover.x}
                                y={popover.y}
                                event={popover.event}
                                onEdit={() => {
                                    if (popover.event) {
                                        setSelectEvent(popover.event);
                                        setShowViewModal(true);
                                    }
                                }}
                                onDelete={() => {
                                    if (popover.event) {
                                        setIdToDelete(popover.event.id);
                                        setShowDeleteModal(true);
                                    }
                                }}
                            />
                        )}

                        {showCreateModal && (
                            <Modal closeModal={handleEventClose}>
                                <div className="bg-white rounded-xl p-10">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                        <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900 border-b pb-2">Criar Evento</h3>
                                        <form onSubmit={handleSubmit} className="pt-2">
                                            <div className="mt-2">
                                                <input type="text" name="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" value={newEvent.title} onChange={handleChange} placeholder="Título"
                                                />
                                                <input type="datetime-local" name="start" className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" value={formatISO(new Date(newEvent.start)).substring(0, 16)} onChange={handleChange}
                                                />
                                                <input type="datetime-local" name="end" className="block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" value={newEvent.end ? formatISO(new Date(newEvent.end)).substring(0, 16) : ""} onChange={handleChange}
                                                />
                                            </div>
                                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                                                <button type="submit" className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:col-start-2 disabled:opacity-25" disabled={newEvent.title === ""}
                                                >
                                                    Criar
                                                </button>
                                                <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0" onClick={handleEventClose}
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
                            <Modal closeModal={handleEventClose}>
                                <div className="flex flex-col items-center bg-zinc-50 p-5 rounded-lg">
                                    <div className="flex items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <CgDanger className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                                                Confirmar exclusão de evento
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Tem certeza de que deseja excluir este evento? Esta ação não pode ser desfeita.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 sm:ml-3 sm:w-auto"
                                            onClick={handleDeleteEvent}
                                        >
                                            Excluir
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={handleEventClose}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </Modal>
                        )}

                        {showConflictModal && (
                            <Modal closeModal={handleEventClose}>
                                <div className="bg-white rounded-xl p-10">
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                        <CgDanger className="h-6 w-6 text-red-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900">Conflito de Evento</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Existe um conflito de horário com um evento existente. Por favor, escolha outro horário.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={handleEventClose}
                                        >
                                            Fechar
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