import React, { useEffect, useState } from 'react';
import { SessionNote, ExerciseDose, Exercise } from '../../lib/types';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
interface ExercisesTabProps {
  data: Partial<SessionNote>;
  onChange: (data: Partial<SessionNote>) => void;
  episodeId: string;
  onNext: () => void;
}
export const ExercisesTab = ({
  data,
  onChange,
  episodeId,
  onNext
}: ExercisesTabProps) => {
  const { state } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  // Get prescription for this episode
  const prescription = state.prescriptions.find(
    (p) => p.episodeId === episodeId
  );
  // Initialize doses from prescription if empty
  useEffect(() => {
    if (
    (!data.exerciseDoses || data.exerciseDoses.length === 0) &&
    prescription)
    {
      const initialDoses = prescription.exercises.map((ex) => ({
        exerciseId: ex.exerciseId,
        sets: ex.targetSets,
        reps: ex.targetReps,
        load: 0,
        rpe: 0,
        tolerance: 'bien' as const,
        notes: ''
      }));
      onChange({
        ...data,
        exerciseDoses: initialDoses
      });
    }
  }, []);
  const updateDose = (index: number, field: keyof ExerciseDose, value: any) => {
    const newDoses = [...(data.exerciseDoses || [])];
    newDoses[index] = {
      ...newDoses[index],
      [field]: value
    };
    onChange({
      ...data,
      exerciseDoses: newDoses
    });
  };
  const removeDose = (index: number) => {
    const newDoses = [...(data.exerciseDoses || [])];
    newDoses.splice(index, 1);
    onChange({
      ...data,
      exerciseDoses: newDoses
    });
  };
  const addExercise = (exerciseId: string) => {
    const exercise = state.exercises.find((e) => e.id === exerciseId);
    if (!exercise) return;
    const newDose: ExerciseDose = {
      exerciseId,
      sets: exercise.defaultSets || 3,
      reps: exercise.defaultReps || '10',
      load: 0,
      rpe: 0,
      tolerance: 'bien',
      notes: ''
    };
    onChange({
      ...data,
      exerciseDoses: [...(data.exerciseDoses || []), newDose]
    });
    setShowAddModal(false);
  };
  const calculateVolume = (dose: ExerciseDose) => {
    // Simple volume calculation: sets * reps (if numeric) * load
    const reps = parseInt(dose.reps) || 0;
    return dose.sets * reps * dose.load;
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Ejecución de hoy</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddModal(true)}>

          <Plus className="h-4 w-4 mr-2" />
          Agregar Ejercicio
        </Button>
      </div>

      <div className="space-y-4">
        {data.exerciseDoses?.map((dose, index) => {
          const exercise = state.exercises.find((e) => e.id === dose.exerciseId);
          if (!exercise) return null;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border shadow-sm hover:border-blue-300 transition-colors">

              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold text-gray-900">{exercise.name}</h4>
                  <p className="text-xs text-gray-500">{exercise.category}</p>
                </div>
                <button
                  onClick={() => removeDose(index)}
                  className="text-gray-400 hover:text-red-500">

                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Series
                  </label>
                  <input
                    type="number"
                    className="w-full p-1 border rounded text-sm"
                    value={dose.sets}
                    onChange={(e) =>
                    updateDose(index, 'sets', parseInt(e.target.value))
                    } />

                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Reps
                  </label>
                  <input
                    type="text"
                    className="w-full p-1 border rounded text-sm"
                    value={dose.reps}
                    onChange={(e) => updateDose(index, 'reps', e.target.value)} />

                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Carga (kg)
                  </label>
                  <input
                    type="number"
                    className="w-full p-1 border rounded text-sm font-medium text-blue-600"
                    value={dose.load}
                    onChange={(e) =>
                    updateDose(index, 'load', parseFloat(e.target.value))
                    } />

                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    RPE (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="w-full p-1 border rounded text-sm"
                    value={dose.rpe}
                    onChange={(e) =>
                    updateDose(index, 'rpe', parseInt(e.target.value))
                    } />

                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 block mb-1">
                    Tolerancia
                  </label>
                  <div className="flex rounded-md shadow-sm" role="group">
                    {['bien', 'regular', 'mal'].map((t) =>
                    <button
                      key={t}
                      type="button"
                      onClick={() => updateDose(index, 'tolerance', t)}
                      className={`flex-1 px-2 py-1 text-xs font-medium border first:rounded-l-md last:rounded-r-md capitalize ${dose.tolerance === t ? t === 'bien' ? 'bg-green-100 text-green-700 border-green-200' : t === 'regular' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>

                        {t}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 bg-gray-50 p-2 rounded">
                <span>Volumen estimado: {calculateVolume(dose)} kg</span>
                <input
                  type="text"
                  placeholder="Notas de ejecución..."
                  className="bg-transparent border-none focus:ring-0 text-gray-600 w-1/2 text-right"
                  value={dose.notes || ''}
                  onChange={(e) => updateDose(index, 'notes', e.target.value)} />

              </div>
            </div>);

        })}

        {(!data.exerciseDoses || data.exerciseDoses.length === 0) &&
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-gray-500">
            No hay ejercicios cargados. Agrega uno o carga desde el plan.
          </div>
        }
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} size="lg">
          Continuar a Notas
        </Button>
      </div>

      {/* Add Exercise Modal (Simple inline for demo) */}
      {showAddModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">Biblioteca de Ejercicios</h3>
            <div className="space-y-2">
              {state.exercises.map((ex) =>
            <button
              key={ex.id}
              onClick={() => addExercise(ex.id)}
              className="w-full text-left p-3 hover:bg-gray-50 border rounded flex justify-between items-center">

                  <span>{ex.name}</span>
                  <Plus className="h-4 w-4 text-blue-500" />
                </button>
            )}
            </div>
            <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setShowAddModal(false)}>

              Cancelar
            </Button>
          </div>
        </div>
      }
    </div>);

};