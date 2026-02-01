import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { useApp } from '../../context/AppContext';
import { Program } from '../../lib/types';
interface ProgramBuilderProps {
  onBack: () => void;
}
export const ProgramBuilder = ({ onBack }: ProgramBuilderProps) => {
  const { state, dispatch } = useApp();
  const [formData, setFormData] = useState<Partial<Program>>({
    name: '',
    description: '',
    phase: '',
    weeklyFrequency: 3,
    progressionCriteria: '',
    exercises: []
  });
  const handleSave = () => {
    const newProgram: Program = {
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      name: formData.name || 'Nuevo Programa',
      description: formData.description || '',
      phase: formData.phase || 'Fase 1',
      weeklyFrequency: formData.weeklyFrequency || 3,
      progressionCriteria: formData.progressionCriteria || '',
      exercises: formData.exercises || []
    };
    dispatch({
      type: 'ADD_PROGRAM',
      payload: newProgram
    });
    onBack();
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full">

            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Nuevo Programa</h2>
        </div>
        <Button onClick={handleSave}>Guardar Plantilla</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
            <Input
              label="Nombre del Programa"
              value={formData.name}
              onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value
              })
              } />

            <Textarea
              label="Descripción"
              value={formData.description}
              onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value
              })
              } />

            <Input
              label="Fase / Etapa"
              value={formData.phase}
              onChange={(e) =>
              setFormData({
                ...formData,
                phase: e.target.value
              })
              } />

            <Input
              label="Frecuencia Semanal (días)"
              type="number"
              value={formData.weeklyFrequency}
              onChange={(e) =>
              setFormData({
                ...formData,
                weeklyFrequency: parseInt(e.target.value)
              })
              } />

            <Textarea
              label="Criterios de Progresión"
              value={formData.progressionCriteria}
              onChange={(e) =>
              setFormData({
                ...formData,
                progressionCriteria: e.target.value
              })
              }
              rows={4} />

          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 min-h-[500px] flex flex-col items-center justify-center text-gray-400">
            <p>Constructor de días y ejercicios (Demo Placeholder)</p>
            <p className="text-sm mt-2">
              Aquí iría el drag & drop de ejercicios por día
            </p>
            <Button variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Día
            </Button>
          </div>
        </div>
      </div>
    </div>);

};