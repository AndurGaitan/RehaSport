import React from 'react';
import {
  Clock,
  User,
  CheckCircle,
  Play,
  XCircle,
  AlertCircle } from
'lucide-react';
import { Appointment, Patient, AppointmentStatus } from '../../lib/types';
import { cn } from '../../lib/utils';
import { Button } from '../ui/Button';
interface AppointmentCardProps {
  appointment: Appointment;
  patient?: Patient;
  onClick: () => void;
  onAction: (action: string, appointment: Appointment) => void;
}
export const AppointmentCard = ({
  appointment,
  patient,
  onClick,
  onAction
}: AppointmentCardProps) => {
  const statusColors: Record<AppointmentStatus, string> = {
    scheduled: 'bg-gray-50 border-gray-200 text-gray-700',
    confirmed: 'bg-blue-50 border-blue-200 text-blue-700',
    checked_in: 'bg-amber-50 border-amber-200 text-amber-700',
    in_session:
    'bg-orange-50 border-orange-200 text-orange-700 ring-2 ring-orange-300',
    completed: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    cancelled: 'bg-red-50 border-red-200 text-red-700 opacity-60',
    no_show: 'bg-red-50 border-red-200 text-red-700 opacity-60'
  };
  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    onAction(action, appointment);
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-2 rounded border text-xs h-full flex flex-col justify-between cursor-pointer hover:shadow-md transition-shadow group relative overflow-hidden',
        statusColors[appointment.status]
      )}>

      <div>
        <div className="font-bold truncate flex items-center">
          {patient?.name || 'Unknown Patient'}
        </div>
        <div className="flex items-center mt-1 opacity-80">
          <Clock className="h-3 w-3 mr-1" />
          {appointment.time} ({appointment.duration}m)
        </div>
        <div className="mt-1 capitalize opacity-80 truncate">
          {appointment.type}
        </div>
      </div>

      {/* Quick Actions on Hover */}
      <div className="absolute inset-0 bg-white/90 hidden group-hover:flex items-center justify-center gap-1 p-1 transition-opacity">
        {appointment.status === 'scheduled' &&
        <Button
          size="sm"
          className="h-6 px-2 text-[10px]"
          onClick={(e) => handleAction(e, 'confirm')}>

            Confirmar
          </Button>
        }
        {appointment.status === 'confirmed' &&
        <Button
          size="sm"
          className="h-6 px-2 text-[10px]"
          onClick={(e) => handleAction(e, 'check_in')}>

            Check-in
          </Button>
        }
        {appointment.status === 'checked_in' &&
        <Button
          size="sm"
          variant="primary"
          className="h-6 px-2 text-[10px]"
          onClick={(e) => handleAction(e, 'start_session')}>

            <Play className="h-3 w-3 mr-1" /> Iniciar
          </Button>
        }
        {appointment.status === 'in_session' &&
        <span className="text-orange-600 font-bold animate-pulse">
            En curso...
          </span>
        }
      </div>
    </div>);

};