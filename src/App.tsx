import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { DemoBanner } from './components/layout/DemoBanner';
import { CalendarView } from './components/calendar/CalendarView';
import { DashboardView } from './components/dashboard/DashboardView';
import { PatientsView } from './components/patients/PatientsView';
import { ExercisesView } from './components/exercises/ExercisesView';
import { ReportsView } from './components/reports/ReportsView';
import { SettingsView } from './components/settings/SettingsView';
import { AppProvider, useApp } from './context/AppContext';
import { SessionWorkspace } from './components/session/SessionWorkspace';
import { CommandPalette } from './components/ui/CommandPalette';
import { ToastProvider } from './components/ui/Toast';
import { AICopilot } from './components/ai/AICopilot';
import { Appointment } from './lib/types';
// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8
  },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: -8
  }
};
// Main content wrapper that uses context
const MainContent = () => {
  const { state } = useApp();
  const [activeSession, setActiveSession] = useState<Appointment | null>(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  // Effect to watch for appointments moving to 'in_session'
  useEffect(() => {
    const sessionApt = state.appointments.find((a) => a.status === 'in_session');
    if (sessionApt && !activeSession) {
      setActiveSession(sessionApt);
    }
  }, [state.appointments, activeSession]);
  // Global keyboard shortcut for command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  const renderView = () => {
    const views: Record<string, React.ReactNode> = {
      dashboard: <DashboardView />,
      agenda: <CalendarView />,
      patients: <PatientsView />,
      exercises: <ExercisesView />,
      reports: <ReportsView />,
      settings: <SettingsView />
    };
    return views[state.activeView] || <DashboardView />;
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Demo Banner - Fixed at top */}
      <DemoBanner />

      {/* Main Layout - with top padding for banner */}
      <div className="flex flex-1 pt-10">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex flex-col h-[calc(100vh-40px)] overflow-hidden">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={state.activeView}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  duration: 0.2,
                  ease: 'easeOut'
                }}>

                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* AI Copilot - Floating */}
      <AICopilot />

      {/* Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)} />


      {/* Full Screen Session Workspace Overlay */}
      <AnimatePresence>
        {activeSession &&
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
            duration: 0.2
          }}>

            <SessionWorkspace
            appointment={activeSession}
            onClose={() => setActiveSession(null)} />

          </motion.div>
        }
      </AnimatePresence>
    </div>);

};
export function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <MainContent />
      </ToastProvider>
    </AppProvider>);

}