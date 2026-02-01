import React from 'react';
import { ClipboardList, FileWarning } from 'lucide-react';
import { useApp } from '../../context/AppContext';
export const Worklist = () => {
  const { state, dispatch } = useApp();
  // Patients without active prescription
  const patientsWithoutPlan = state.patients.filter((p) => {
    const activeEpisode = state.episodes.find(
      (e) => e.patientId === p.id && e.status === 'active'
    );
    if (!activeEpisode) return false;
    const hasPlan = state.prescriptions.some(
      (pr) => pr.episodeId === activeEpisode.id
    );
    return !hasPlan;
  });
  // Patients without PRO in last 7 days
  const patientsWithoutPRO = state.patients.filter((p) => {
    const lastPRO = state.pros.
    filter((pro) => pro.patientId === p.id).
    sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )[0];
    if (!lastPRO) return true;
    const daysSince =
    (new Date().getTime() - new Date(lastPRO.date).getTime()) / (
    1000 * 3600 * 24);
    return daysSince > 7;
  });
  const handleNavigateToPatient = (patientId: string) => {
    dispatch({
      type: 'SET_SELECTED_PATIENT',
      payload: patientId
    });
    dispatch({
      type: 'SET_VIEW',
      payload: 'patients'
    });
  };
  const totalTasks = patientsWithoutPlan.length + patientsWithoutPRO.length;
  if (totalTasks === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-medium text-gray-900 mb-2">Pendientes</h3>
        <p className="text-sm text-gray-500">¡Todo al día!</p>
      </div>);

  }
  return (
    <div className="bg-white rounded-xl border border-gray-100">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Pendientes</h3>
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
            {totalTasks}
          </span>
        </div>
      </div>

      <div className="divide-y divide-gray-50">
        {patientsWithoutPlan.slice(0, 3).map((p) =>
        <button
          key={`plan-${p.id}`}
          onClick={() => handleNavigateToPatient(p.id)}
          className="w-full p-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors text-left">

            <div className="h-8 w-8 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="h-4 w-4 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {p.name}
              </p>
              <p className="text-xs text-gray-500">Sin plan asignado</p>
            </div>
          </button>
        )}

        {patientsWithoutPRO.slice(0, 2).map((p) =>
        <button
          key={`pro-${p.id}`}
          onClick={() => handleNavigateToPatient(p.id)}
          className="w-full p-4 flex items-center gap-3 hover:bg-gray-50/50 transition-colors text-left">

            <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FileWarning className="h-4 w-4 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {p.name}
              </p>
              <p className="text-xs text-gray-500">PRO pendiente</p>
            </div>
          </button>
        )}
      </div>
    </div>);

};