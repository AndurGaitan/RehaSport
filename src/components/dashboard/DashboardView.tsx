import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle, ArrowRight, Command } from 'lucide-react';
import { TodayAppointments } from './TodayAppointments';
import { Worklist } from './Worklist';
import { useApp } from '../../context/AppContext';
const container = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};
export const DashboardView = () => {
  const { state, dispatch } = useApp();
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = state.appointments.filter(
    (a) => a.date === today && a.status !== 'cancelled'
  ).length;
  const activePatients = state.patients.filter((p) =>
  state.episodes.some((e) => e.patientId === p.id && e.status === 'active')
  ).length;
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
  const completedThisWeek = state.appointments.filter(
    (a) => a.status === 'completed' && new Date(a.date) >= startOfWeek
  ).length;
  const hour = new Date().getHours();
  const greeting =
  hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8">

      {/* Header */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold text-gray-900">
          {greeting}, Lic. Gaitán Andrés David
        </h1>
        <p className="text-gray-500 mt-1 flex items-center gap-2">
          Presiona{' '}
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 rounded border font-mono">
            ⌘K
          </kbd>{' '}
          para búsqueda rápida
        </p>
      </motion.div>

      {/* Minimal KPIs */}
      <motion.div variants={item} className="grid grid-cols-3 gap-6">
        <motion.div
          whileHover={{
            y: -2
          }}
          className="bg-white p-5 rounded-xl border border-gray-100 cursor-pointer"
          onClick={() =>
          dispatch({
            type: 'SET_VIEW',
            payload: 'agenda'
          })
          }>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Turnos hoy</p>
              <motion.p
                className="text-3xl font-semibold text-gray-900 mt-1"
                initial={{
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: 0.2,
                  type: 'spring'
                }}>

                {todayAppointments}
              </motion.p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -2
          }}
          className="bg-white p-5 rounded-xl border border-gray-100 cursor-pointer"
          onClick={() =>
          dispatch({
            type: 'SET_VIEW',
            payload: 'patients'
          })
          }>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pacientes activos</p>
              <motion.p
                className="text-3xl font-semibold text-gray-900 mt-1"
                initial={{
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: 0.3,
                  type: 'spring'
                }}>

                {activePatients}
              </motion.p>
            </div>
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -2
          }}
          className="bg-white p-5 rounded-xl border border-gray-100 cursor-pointer"
          onClick={() =>
          dispatch({
            type: 'SET_VIEW',
            payload: 'reports'
          })
          }>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sesiones esta semana</p>
              <motion.p
                className="text-3xl font-semibold text-gray-900 mt-1"
                initial={{
                  opacity: 0,
                  scale: 0.5
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  delay: 0.4,
                  type: 'spring'
                }}>

                {completedThisWeek}
              </motion.p>
            </div>
            <div className="h-10 w-10 rounded-full bg-violet-50 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-violet-600" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div variants={item} className="lg:col-span-3">
          <TodayAppointments />
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2 space-y-6">
          <Worklist />

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-medium text-gray-900 mb-4">Acciones rápidas</h3>
            <div className="space-y-1">
              {[
              {
                label: 'Ir a la agenda',
                view: 'agenda'
              },
              {
                label: 'Ver todos los pacientes',
                view: 'patients'
              },
              {
                label: 'Biblioteca de ejercicios',
                view: 'exercises'
              }].
              map((action, i) =>
              <motion.button
                key={action.view}
                whileHover={{
                  x: 4
                }}
                onClick={() =>
                dispatch({
                  type: 'SET_VIEW',
                  payload: action.view
                })
                }
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors text-left group">

                  <span className="text-sm text-gray-700">{action.label}</span>
                  <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Keyboard Hint */}
          <motion.div
            variants={item}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-5 text-white">

            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Command className="h-4 w-4" />
              </div>
              <span className="font-medium">Tip del día</span>
            </div>
            <p className="text-sm text-gray-300">
              Usa{' '}
              <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs">
                ⌘K
              </kbd>{' '}
              para acceder rápidamente a cualquier paciente, vista o acción.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>);

};