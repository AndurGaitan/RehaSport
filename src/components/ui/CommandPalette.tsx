import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  Users,
  Dumbbell,
  FileText,
  Settings,
  Plus,
  ArrowRight,
  User,
  Activity } from
'lucide-react';
import { useApp } from '../../context/AppContext';
interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}
type CommandItem = {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: 'navigation' | 'action' | 'patient';
};
export const CommandPalette = ({ isOpen, onClose }: CommandPaletteProps) => {
  const { state, dispatch } = useApp();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigationCommands: CommandItem[] = [
  {
    id: 'dashboard',
    label: 'Ir al Dashboard',
    icon: <Activity className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'dashboard'
      });
      onClose();
    },
    category: 'navigation'
  },
  {
    id: 'agenda',
    label: 'Ir a la Agenda',
    icon: <Calendar className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'agenda'
      });
      onClose();
    },
    category: 'navigation'
  },
  {
    id: 'patients',
    label: 'Ver Pacientes',
    icon: <Users className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'patients'
      });
      onClose();
    },
    category: 'navigation'
  },
  {
    id: 'exercises',
    label: 'Biblioteca de Ejercicios',
    icon: <Dumbbell className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'exercises'
      });
      onClose();
    },
    category: 'navigation'
  },
  {
    id: 'reports',
    label: 'Ver Reportes',
    icon: <FileText className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'reports'
      });
      onClose();
    },
    category: 'navigation'
  },
  {
    id: 'settings',
    label: 'Configuración',
    icon: <Settings className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'settings'
      });
      onClose();
    },
    category: 'navigation'
  }];

  const actionCommands: CommandItem[] = [
  {
    id: 'new-appointment',
    label: 'Nuevo Turno',
    description: 'Agendar una cita',
    icon: <Plus className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'agenda'
      });
      onClose();
    },
    category: 'action'
  },
  {
    id: 'new-patient',
    label: 'Nuevo Paciente',
    description: 'Registrar paciente',
    icon: <Plus className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_VIEW',
        payload: 'patients'
      });
      onClose();
    },
    category: 'action'
  }];

  const patientCommands: CommandItem[] = state.patients.map((p) => ({
    id: `patient-${p.id}`,
    label: p.name,
    description: p.sport || p.email,
    icon: <User className="h-4 w-4" />,
    action: () => {
      dispatch({
        type: 'SET_SELECTED_PATIENT',
        payload: p.id
      });
      dispatch({
        type: 'SET_VIEW',
        payload: 'patients'
      });
      onClose();
    },
    category: 'patient' as const
  }));
  const allCommands = [
  ...navigationCommands,
  ...actionCommands,
  ...patientCommands];

  const filteredCommands = search ?
  allCommands.filter(
    (cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description?.toLowerCase().includes(search.toLowerCase())
  ) :
  allCommands;
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => Math.min(i + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    },
    [isOpen, filteredCommands, selectedIndex, onClose]
  );
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);
  const groupedCommands = {
    navigation: filteredCommands.filter((c) => c.category === 'navigation'),
    action: filteredCommands.filter((c) => c.category === 'action'),
    patient: filteredCommands.filter((c) => c.category === 'patient')
  };
  let currentIndex = -1;
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.15
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose} />


          {/* Palette */}
          <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            y: -20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: -20
          }}
          transition={{
            duration: 0.15,
            ease: 'easeOut'
          }}
          className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-200">

            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-gray-100">
              <Search className="h-5 w-5 text-gray-400" />
              <input
              type="text"
              placeholder="Buscar comandos, pacientes..."
              className="flex-1 px-3 py-4 text-base outline-none placeholder-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus />

              <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 bg-gray-100 rounded">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto py-2">
              {filteredCommands.length === 0 ?
            <div className="px-4 py-8 text-center text-gray-500">
                  No se encontraron resultados
                </div> :

            <>
                  {groupedCommands.action.length > 0 &&
              <div className="px-2 py-1">
                      <p className="px-2 py-1 text-xs font-medium text-gray-400 uppercase">
                        Acciones
                      </p>
                      {groupedCommands.action.map((cmd) => {
                  currentIndex++;
                  const idx = currentIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${selectedIndex === idx ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>

                            <span
                        className={
                        selectedIndex === idx ?
                        'text-blue-600' :
                        'text-gray-400'
                        }>

                              {cmd.icon}
                            </span>
                            <span className="flex-1 text-left font-medium">
                              {cmd.label}
                            </span>
                            {cmd.description &&
                      <span className="text-sm text-gray-400">
                                {cmd.description}
                              </span>
                      }
                            <ArrowRight
                        className={`h-4 w-4 ${selectedIndex === idx ? 'text-blue-400' : 'text-gray-300'}`} />

                          </button>);

                })}
                    </div>
              }

                  {groupedCommands.navigation.length > 0 &&
              <div className="px-2 py-1">
                      <p className="px-2 py-1 text-xs font-medium text-gray-400 uppercase">
                        Navegación
                      </p>
                      {groupedCommands.navigation.map((cmd) => {
                  currentIndex++;
                  const idx = currentIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${selectedIndex === idx ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>

                            <span
                        className={
                        selectedIndex === idx ?
                        'text-blue-600' :
                        'text-gray-400'
                        }>

                              {cmd.icon}
                            </span>
                            <span className="flex-1 text-left">
                              {cmd.label}
                            </span>
                            <ArrowRight
                        className={`h-4 w-4 ${selectedIndex === idx ? 'text-blue-400' : 'text-gray-300'}`} />

                          </button>);

                })}
                    </div>
              }

                  {groupedCommands.patient.length > 0 &&
              <div className="px-2 py-1">
                      <p className="px-2 py-1 text-xs font-medium text-gray-400 uppercase">
                        Pacientes
                      </p>
                      {groupedCommands.patient.slice(0, 5).map((cmd) => {
                  currentIndex++;
                  const idx = currentIndex;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${selectedIndex === idx ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}>

                            <span
                        className={
                        selectedIndex === idx ?
                        'text-blue-600' :
                        'text-gray-400'
                        }>

                              {cmd.icon}
                            </span>
                            <span className="flex-1 text-left">
                              {cmd.label}
                            </span>
                            {cmd.description &&
                      <span className="text-sm text-gray-400">
                                {cmd.description}
                              </span>
                      }
                            <ArrowRight
                        className={`h-4 w-4 ${selectedIndex === idx ? 'text-blue-400' : 'text-gray-300'}`} />

                          </button>);

                })}
                    </div>
              }
                </>
            }
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">↵</kbd>
                  seleccionar
                </span>
              </div>
              <span>⌘K para abrir</span>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

};