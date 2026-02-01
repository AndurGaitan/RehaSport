import React from 'react';
import { useApp } from '../../context/AppContext';
import { Appointment } from '../../lib/types';
import { Clock, Play, Check, User } from 'lucide-react';
import { cn } from '../../lib/utils';
export const TodayAppointments = () => {
  const { state, dispatch } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const appointments = state.appointments.
  filter((a) => a.date === today && a.status !== 'cancelled').
  sort((a, b) => a.time.localeCompare(b.time));
  const handleAction = (action: string, appointment: Appointment) => {
    if (action === 'start_session') {
      dispatch({
        type: 'UPDATE_APPOINTMENT',
        payload: {
          ...appointment,
          status: 'in_session'
        }
      });
    } else {
      const statusMap: Record<string, any> = {
        confirm: 'confirmed',
        check_in: 'checked_in',
        complete: 'completed'
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
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'checked_in':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'in_session':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'Programado';
      case 'confirmed':
        return 'Confirmado';
      case 'checked_in':
        return 'En sala';
      case 'in_session':
        return 'En sesión';
      case 'completed':
        return 'Completado';
      default:
        return status;
    }
  };
  return (
    <div className="bg-white rounded-xl border border-gray-100 h-full">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Agenda de hoy</h3>
          <span className="text-sm text-gray-500">
            {appointments.length} turnos
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {appointments.length > 0 ?
        appointments.map((apt) => {
          const patient = state.patients.find((p) => p.id === apt.patientId);
          const episode = state.episodes.find((e) => e.id === apt.episodeId);
          return (
            <div
              key={apt.id}
              className="p-4 hover:bg-gray-50/50 transition-colors">

                <div className="flex items-start gap-4">
                  {/* Time */}
                  <div className="text-center w-14 flex-shrink-0">
                    <p className="text-lg font-semibold text-gray-900">
                      {apt.time}
                    </p>
                    <p className="text-xs text-gray-400">{apt.duration}m</p>
                  </div>

                  {/* Patient Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                        {patient?.photoUrl ?
                      <img
                        src={patient.photoUrl}
                        alt=""
                        className="h-full w-full object-cover" /> :


                      <div className="h-full w-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-400" />
                          </div>
                      }
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {patient?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {episode?.injury || apt.type}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                    className={cn(
                      'text-xs px-2 py-1 rounded-full border',
                      getStatusStyle(apt.status)
                    )}>

                      {getStatusLabel(apt.status)}
                    </span>

                    {apt.status === 'confirmed' &&
                  <button
                    onClick={() => handleAction('check_in', apt)}
                    className="p-1.5 rounded-lg bg-amber-100 text-amber-600 hover:bg-amber-200 transition-colors"
                    title="Check-in">

                        <Check className="h-4 w-4" />
                      </button>
                  }
                    {apt.status === 'checked_in' &&
                  <button
                    onClick={() => handleAction('start_session', apt)}
                    className="p-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    title="Iniciar sesión">

                        <Play className="h-4 w-4" />
                      </button>
                  }
                    {apt.status === 'scheduled' &&
                  <button
                    onClick={() => handleAction('confirm', apt)}
                    className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                    title="Confirmar">

                        <Check className="h-4 w-4" />
                      </button>
                  }
                  </div>
                </div>
              </div>);

        }) :

        <div className="p-12 text-center">
            <Clock className="h-8 w-8 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay turnos para hoy</p>
          </div>
        }
      </div>
    </div>);

};