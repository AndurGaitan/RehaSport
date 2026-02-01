import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Activity,
  Dumbbell,
  FileText,
  Image } from
'lucide-react';
import { Patient } from '../../lib/types';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useApp } from '../../context/AppContext';
import { Badge } from '../ui/Badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer } from
'recharts';
interface PatientDetailProps {
  patient: Patient;
  onBack: () => void;
}
export const PatientDetail = ({ patient, onBack }: PatientDetailProps) => {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('resumen');
  const episodes = state.episodes.filter((e) => e.patientId === patient.id);
  const activeEpisode = episodes.find((e) => e.status === 'active');
  const sessions = state.sessionNotes.filter((n) => n.patientId === patient.id);
  const pros = state.pros.filter((p) => p.patientId === patient.id);
  // Prepare chart data
  const painData = pros.map((p) => ({
    date: new Date(p.date).toLocaleDateString(),
    pain: p.painLevel
  }));
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full">

            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden mr-4">
            {patient.photoUrl ?
            <img
              src={patient.photoUrl}
              alt=""
              className="h-full w-full object-cover" /> :


            <div className="h-full w-full flex items-center justify-center text-2xl font-bold text-gray-500">
                {patient.name.charAt(0)}
              </div>
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              <span>{patient.sport}</span>
              <span>•</span>
              <span className="capitalize">{patient.level}</span>
              <span>•</span>
              <span>{patient.phone}</span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Agendar Turno</Button>
          <Button>Crear Episodio</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6">
          <Tabs
            tabs={[
            {
              id: 'resumen',
              label: 'Resumen',
              icon: <Activity className="h-4 w-4" />
            },
            {
              id: 'episodios',
              label: 'Episodios',
              icon: <FileText className="h-4 w-4" />
            },
            {
              id: 'sesiones',
              label: 'Sesiones',
              icon: <Calendar className="h-4 w-4" />
            },
            {
              id: 'ejercicios',
              label: 'Plan',
              icon: <Dumbbell className="h-4 w-4" />
            },
            {
              id: 'media',
              label: 'Media',
              icon: <Image className="h-4 w-4" />
            }]
            }
            activeTab={activeTab}
            onChange={setActiveTab} />

        </div>

        <div className="p-6">
          {activeTab === 'resumen' &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Episodio Activo
                  </h3>
                  {activeEpisode ?
                <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-blue-600">
                            {activeEpisode.injury}
                          </p>
                          <p className="text-sm text-gray-600">
                            {activeEpisode.diagnosis}
                          </p>
                        </div>
                        <Badge variant="success">{activeEpisode.phase}</Badge>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        Inicio:{' '}
                        {new Date(activeEpisode.startDate).toLocaleDateString()}
                      </div>
                    </div> :

                <p className="text-gray-500 text-sm">
                      No hay episodio activo
                    </p>
                }
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Evolución de Dolor (PRO)
                  </h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={painData}>
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis domain={[0, 10]} fontSize={12} />
                        <Tooltip />
                        <Line
                        type="monotone"
                        dataKey="pain"
                        stroke="#2563EB"
                        strokeWidth={2} />

                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Próximos Turnos
                  </h3>
                  <div className="space-y-3">
                    {state.appointments.
                  filter(
                    (a) =>
                    a.patientId === patient.id &&
                    new Date(a.date) >= new Date()
                  ).
                  map((apt) =>
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded border">

                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {new Date(apt.date).toLocaleDateString()}
                              </p>
                              <p className="text-xs text-gray-500">
                                {apt.time} • {apt.type}
                              </p>
                            </div>
                          </div>
                          <Badge>{apt.status}</Badge>
                        </div>
                  )}
                  </div>
                </div>
              </div>
            </div>
          }

          {activeTab === 'episodios' &&
          <div className="space-y-4">
              {episodes.map((ep) =>
            <div
              key={ep.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">

                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{ep.injury}</h3>
                      <p className="text-sm text-gray-600">{ep.diagnosis}</p>
                    </div>
                    <Badge
                  variant={ep.status === 'active' ? 'success' : 'neutral'}>

                      {ep.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex space-x-3">
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                    {ep.status === 'active' &&
                <Button size="sm">Asignar Plan</Button>
                }
                  </div>
                </div>
            )}
            </div>
          }

          {activeTab === 'sesiones' &&
          <div className="space-y-4">
              {sessions.map((session) =>
            <div key={session.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mt-2"></div>
                    <div className="w-0.5 flex-1 bg-gray-200 my-1"></div>
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="bg-gray-50 p-4 rounded-lg border">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">
                          {new Date(session.date).toLocaleDateString()}
                        </span>
                        <Badge
                      variant={
                      session.painLevel > 5 ? 'warning' : 'success'
                      }>

                          Dolor: {session.painLevel}/10
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {session.sessionGoal}
                      </p>
                      <p className="text-sm text-gray-800 italic">
                        "{session.soapNote.analysis}"
                      </p>
                    </div>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </div>);

};