import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useApp } from '../../context/AppContext';
import { Appointment, SessionNote } from '../../lib/types';
import { SymptomsTab } from './SymptomsTab';
import { ExercisesTab } from './ExercisesTab';
import { NotesTab } from './NotesTab';
import { Confetti } from '../ui/Confetti';
import { useToast } from '../ui/Toast';
interface SessionWorkspaceProps {
  appointment: Appointment;
  onClose: () => void;
}
export const SessionWorkspace = ({
  appointment,
  onClose
}: SessionWorkspaceProps) => {
  const { state, dispatch } = useApp();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('symptoms');
  const [isSaving, setIsSaving] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const patient = state.patients.find((p) => p.id === appointment.patientId);
  const episode = state.episodes.find((e) => e.id === appointment.episodeId);
  const [sessionData, setSessionData] = useState<Partial<SessionNote>>({
    appointmentId: appointment.id,
    episodeId: appointment.episodeId,
    patientId: appointment.patientId,
    date: new Date().toISOString(),
    painLevel: 0,
    readiness: 3,
    sessionGoal: '',
    exerciseDoses: [],
    soapNote: {
      subjective: '',
      objective: '',
      analysis: '',
      plan: ''
    }
  });
  const handleFinishSession = () => {
    setIsSaving(true);
    // Create session note
    const newNote: SessionNote = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      ...(sessionData as SessionNote)
    };
    dispatch({
      type: 'ADD_SESSION_NOTE',
      payload: newNote
    });
    dispatch({
      type: 'UPDATE_APPOINTMENT',
      payload: {
        ...appointment,
        status: 'completed'
      }
    });
    // Show celebration
    setTimeout(() => {
      setIsSaving(false);
      setShowConfetti(true);
      setShowSuccess(true);
    }, 500);
    // Close after celebration
    setTimeout(() => {
      showToast(`Sesión con ${patient?.name} completada`, 'success');
      onClose();
    }, 2500);
  };
  if (!patient || !episode)
  return <div>Error: Patient or Episode not found</div>;
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 flex flex-col">
      <Confetti isActive={showConfetti} />

      {/* Success Overlay */}
      {showSuccess &&
      <motion.div
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">

          <motion.div
          initial={{
            scale: 0.8,
            opacity: 0
          }}
          animate={{
            scale: 1,
            opacity: 1
          }}
          transition={{
            delay: 0.1,
            type: 'spring',
            stiffness: 200
          }}
          className="text-center">

            <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              delay: 0.2,
              type: 'spring',
              stiffness: 300
            }}
            className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">

              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </motion.div>
            <motion.h2
            initial={{
              y: 10,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.3
            }}
            className="text-2xl font-bold text-gray-900 mb-2">

              ¡Sesión Completada!
            </motion.h2>
            <motion.p
            initial={{
              y: 10,
              opacity: 0
            }}
            animate={{
              y: 0,
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="text-gray-500">

              Excelente trabajo con {patient.name}
            </motion.p>
          </motion.div>
        </motion.div>
      }

      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors">

            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
              {patient.photoUrl ?
              <img
                src={patient.photoUrl}
                alt=""
                className="h-full w-full object-cover" /> :


              <div className="h-full w-full flex items-center justify-center text-lg font-bold text-gray-500">
                  {patient.name.charAt(0)}
                </div>
              }
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {patient.name}
              </h1>
              <p className="text-sm text-gray-500">
                {episode.injury} • {episode.phase}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            En sesión desde {appointment.time}
          </div>
          <Button
            variant="primary"
            onClick={handleFinishSession}
            disabled={isSaving}
            className="gap-2">

            {isSaving ?
            <>
                <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'linear'
                }}>

                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Guardando...
              </> :

            <>
                Finalizar Sesión
                <CheckCircle className="h-4 w-4" />
              </>
            }
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white px-6 border-b">
        <Tabs
          tabs={[
          {
            id: 'symptoms',
            label: '1. Resumen & Síntomas'
          },
          {
            id: 'exercises',
            label: '2. Ejercicios & Dosis'
          },
          {
            id: 'notes',
            label: '3. Nota Clínica (SOAP)'
          }]
          }
          activeTab={activeTab}
          onChange={setActiveTab} />

      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 max-w-5xl mx-auto w-full">
        <motion.div
          key={activeTab}
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            duration: 0.2
          }}>

          {activeTab === 'symptoms' &&
          <SymptomsTab
            data={sessionData}
            onChange={setSessionData}
            onNext={() => setActiveTab('exercises')} />

          }
          {activeTab === 'exercises' &&
          <ExercisesTab
            data={sessionData}
            onChange={setSessionData}
            episodeId={episode.id}
            onNext={() => setActiveTab('notes')} />

          }
          {activeTab === 'notes' &&
          <NotesTab data={sessionData} onChange={setSessionData} />
          }
        </motion.div>
      </div>
    </div>);

};