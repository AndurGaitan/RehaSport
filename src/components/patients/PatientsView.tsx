import React, { useState } from 'react';
import { Search, Plus, Filter, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useApp } from '../../context/AppContext';
import { PatientDetail } from './PatientDetail';
import { NewPatientModal } from './NewPatientModal';
import { Badge } from '../ui/Badge';
export const PatientsView = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  // If a patient is selected, show detail view
  if (state.selectedPatientId) {
    const patient = state.patients.find((p) => p.id === state.selectedPatientId);
    if (patient) {
      return (
        <PatientDetail
          patient={patient}
          onBack={() =>
          dispatch({
            type: 'SET_SELECTED_PATIENT',
            payload: undefined
          })
          } />);


    }
  }
  const filteredPatients = state.patients.filter(
    (p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Pacientes</h2>
        <Button onClick={() => setShowNewModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Paciente
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              className="w-full pl-10 pr-4 py-2 border rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />

          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
        </div>

        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paciente
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deporte
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Última Sesión
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => {
              const activeEpisode = state.episodes.find(
                (e) => e.patientId === patient.id && e.status === 'active'
              );
              const lastSession = state.sessionNotes.
              filter((n) => n.patientId === patient.id).
              sort(
                (a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
              )[0];
              return (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                  dispatch({
                    type: 'SET_SELECTED_PATIENT',
                    payload: patient.id
                  })
                  }>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        {patient.photoUrl ?
                        <img
                          src={patient.photoUrl}
                          alt=""
                          className="h-full w-full object-cover" /> :


                        <div className="h-full w-full flex items-center justify-center text-gray-500 font-bold">
                            {patient.name.charAt(0)}
                          </div>
                        }
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.sport || '-'}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {patient.level}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activeEpisode ?
                    <Badge variant="success">Activo</Badge> :

                    <Badge variant="neutral">Inactivo</Badge>
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lastSession ?
                    new Date(lastSession.date).toLocaleDateString() :
                    '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <ChevronRight className="h-5 w-5 text-gray-400 inline-block" />
                  </td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>

      <NewPatientModal
        isOpen={showNewModal}
        onClose={() => setShowNewModal(false)} />

    </div>);

};