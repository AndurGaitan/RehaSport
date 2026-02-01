import React from 'react';
import { Users, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
export const KPICards = () => {
  const { state } = useApp();
  const today = new Date().toISOString().split('T')[0];
  // Calculate KPIs
  const todayAppointments = state.appointments.filter(
    (a) => a.date === today && a.status !== 'cancelled'
  );
  const pendingConfirm = state.appointments.filter(
    (a) => a.status === 'scheduled' && new Date(a.date) >= new Date()
  );
  const activePatients = state.patients.length; // Simplified
  // No shows this week
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const noShows = state.appointments.filter(
    (a) => a.status === 'no_show' && new Date(a.date) >= startOfWeek
  ).length;
  // Completed sessions this week
  const completedSessions = state.appointments.filter(
    (a) => a.status === 'completed' && new Date(a.date) >= startOfWeek
  ).length;
  const cards = [
  {
    title: 'Turnos Hoy',
    value: todayAppointments.length,
    icon: Calendar,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    title: 'Pendientes',
    value: pendingConfirm.length,
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  },
  {
    title: 'Pacientes Activos',
    value: activePatients,
    icon: Users,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    title: 'No-Shows Semana',
    value: noShows,
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  {
    title: 'Sesiones Semana',
    value: completedSessions,
    icon: CheckCircle,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) =>
      <div
        key={index}
        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {card.value}
            </p>
          </div>
          <div className={`p-3 rounded-full ${card.bg}`}>
            <card.icon className={`h-6 w-6 ${card.color}`} />
          </div>
        </div>
      )}
    </div>);

};