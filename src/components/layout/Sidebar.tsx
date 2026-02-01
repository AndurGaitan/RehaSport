import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  FileText,
  Settings,
  Layout,
  Dumbbell,
  Command,
  BicepsFlexed
 } from
'lucide-react';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';
const navigation = [
{
  name: 'Dashboard',
  icon: Layout,
  id: 'dashboard'
},
{
  name: 'Agenda',
  icon: Calendar,
  id: 'agenda'
},
{
  name: 'Pacientes',
  icon: Users,
  id: 'patients'
},
{
  name: 'Ejercicios',
  icon: Dumbbell,
  id: 'exercises'
},
{
  name: 'Reportes',
  icon: FileText,
  id: 'reports'
},
{
  name: 'Configuración',
  icon: Settings,
  id: 'settings'
}];

export const Sidebar = () => {
  const { state, dispatch } = useApp();
  return (
    <div className="hidden md:flex h-[calc(100vh-40px)] w-64 flex-col fixed left-0 top-10 bg-white border-r z-10">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <BicepsFlexed className="h-8 w-8 mr-2" />
          RehaSport
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {navigation.map((item) => {
          const isActive = state.activeView === item.id;
          return (
            <motion.button
              key={item.name}
              whileHover={{
                x: 4
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() =>
              dispatch({
                type: 'SET_VIEW',
                payload: item.id
              })
              }
              className={cn(
                'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group relative',
                isActive ?
                'bg-blue-50 text-blue-700' :
                'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}>

              {isActive &&
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />

              }
              <item.icon
                className={cn(
                  'mr-3 h-5 w-5 transition-colors',
                  isActive ?
                  'text-blue-600' :
                  'text-gray-400 group-hover:text-gray-500'
                )} />

              {item.name}
            </motion.button>);

        })}
      </nav>

      {/* Command Palette Hint */}
      <div className="px-4 pb-4">
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Command className="h-4 w-4" />
            <span>Búsqueda rápida</span>
            <kbd className="ml-auto px-1.5 py-0.5 text-xs bg-white rounded border font-mono">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            AV
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700">Klgo. Gaitán Andrés David</p>
            <p className="text-xs text-gray-500">Kinesiólogo</p>
          </div>
        </div>
      </div>
    </div>);

};