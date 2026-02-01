import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useApp } from '../../context/AppContext';
import { AppointmentCard } from './AppointmentCard';
import { NewAppointmentModal } from './NewAppointmentModal';
import { Appointment } from '../../lib/types';
const timeSlots = Array.from(
  {
    length: 25
  },
  (_, i) => {
    const hour = Math.floor(i / 2) + 8;
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  }
);
const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
export const CalendarView = () => {
  const { state, dispatch } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterProf, setFilterProf] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState<{
    date?: string;
    time?: string;
  }>({});
  // Helper to format date as YYYY-MM-DD
  const formatDate = (date: Date) => date.toISOString().split('T')[0];
  // Get start of week
  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is sunday
    return new Date(d.setDate(diff));
  };
  const startOfWeek = getStartOfWeek(selectedDate);
  // Generate week dates
  const weekDates = weekDays.map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });
  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };
  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };
  const handleSlotClick = (date: string, time: string) => {
    setModalParams({
      date,
      time
    });
    setIsModalOpen(true);
  };
  const handleAction = (action: string, appointment: Appointment) => {
    if (action === 'start_session') {
      // Set active appointment and switch to session view
      // We'll need to add a way to pass this context
      // For now, let's just update status
      const updated = {
        ...appointment,
        status: 'in_session' as const
      };
      dispatch({
        type: 'UPDATE_APPOINTMENT',
        payload: updated
      });
      // In a real app, we'd navigate to /session/[id]
      // Here we'll simulate by switching view
      // But we need to know WHICH appointment is active
      // Let's add that to context later or pass via URL if we had router
    } else {
      const statusMap: Record<string, any> = {
        confirm: 'confirmed',
        check_in: 'checked_in',
        complete: 'completed',
        cancel: 'cancelled',
        no_show: 'no_show'
      };
      if (statusMap[action]) {
        dispatch({
          type: 'UPDATE_APPOINTMENT',
          payload: {
            ...appointment,
            status: statusMap[action]
          }
        });
      }
    }
  };
  return (
    <div className="flex flex-col h-full">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            {selectedDate.toLocaleDateString('es-AR', {
              month: 'long',
              year: 'numeric'
            })}
          </h2>
          <div className="flex items-center bg-white rounded-md shadow-sm border">
            <button onClick={handlePrevWeek} className="p-1 hover:bg-gray-50">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 text-sm font-medium border-l border-r hover:bg-gray-50">

              Hoy
            </button>
            <button onClick={handleNextWeek} className="p-1 hover:bg-gray-50">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-48">
            <Select
              options={[
              {
                value: 'all',
                label: 'Todos los profesionales'
              },
              ...state.professionals.map((p) => ({
                value: p.id,
                label: p.name
              }))]
              }
              value={filterProf}
              onChange={(e) => setFilterProf(e.target.value)}
              className="text-sm" />

          </div>
          <Button onClick={() => setIsModalOpen(true)}>Nuevo Turno</Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 bg-white border rounded-lg shadow overflow-hidden flex flex-col">
        {/* Header Row */}
        <div className="grid grid-cols-[60px_repeat(5,1fr)] border-b bg-gray-50">
          <div className="p-2 border-r"></div>
          {weekDates.map((date, i) =>
          <div key={i} className="p-2 text-center border-r last:border-r-0">
              <div className="text-sm font-medium text-gray-900">
                {weekDays[i]}
              </div>
              <div className="text-xs text-gray-500">{date.getDate()}</div>
            </div>
          )}
        </div>

        {/* Time Slots */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-[60px_repeat(5,1fr)]">
            {/* Time Column */}
            <div className="border-r bg-gray-50">
              {timeSlots.map((time) =>
              <div
                key={time}
                className="h-20 border-b text-xs text-gray-500 flex items-start justify-center pt-1">

                  {time}
                </div>
              )}
            </div>

            {/* Days Columns */}
            {weekDates.map((date, dayIndex) => {
              const dateStr = formatDate(date);
              return (
                <div
                  key={dayIndex}
                  className="border-r last:border-r-0 relative">

                  {timeSlots.map((time) => {
                    // Find appointments starting at this time
                    const slotAppointments = state.appointments.filter(
                      (apt) => {
                        if (
                        filterProf !== 'all' &&
                        apt.professionalId !== filterProf)

                        return false;
                        return (
                          apt.date === dateStr &&
                          apt.time === time &&
                          apt.status !== 'cancelled');

                      }
                    );
                    return (
                      <div
                        key={time}
                        className="h-20 border-b border-gray-100 hover:bg-gray-50 transition-colors relative group"
                        onClick={() => handleSlotClick(dateStr, time)}>

                        {/* Render Appointments */}
                        {slotAppointments.map((apt) =>
                        <div
                          key={apt.id}
                          className="absolute inset-x-1 inset-y-1 z-10">

                            <AppointmentCard
                            appointment={apt}
                            patient={state.patients.find(
                              (p) => p.id === apt.patientId
                            )}
                            onClick={() => {}} // Open detail modal
                            onAction={handleAction} />

                          </div>
                        )}

                        {/* Add button on hover if empty */}
                        {slotAppointments.length === 0 &&
                        <div className="absolute inset-0 hidden group-hover:flex items-center justify-center opacity-50">
                            <span className="text-blue-500 text-xs font-medium">
                              + Agendar
                            </span>
                          </div>
                        }
                      </div>);

                  })}
                </div>);

            })}
          </div>
        </div>
      </div>

      <NewAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDate={modalParams.date}
        initialTime={modalParams.time} />

    </div>);

};