import React from 'react';
import { SessionNote } from '../../lib/types';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { Frown, Meh, Smile } from 'lucide-react';
interface SymptomsTabProps {
  data: Partial<SessionNote>;
  onChange: (data: Partial<SessionNote>) => void;
  onNext: () => void;
}
export const SymptomsTab = ({ data, onChange, onNext }: SymptomsTabProps) => {
  const handlePainChange = (val: number) => {
    onChange({
      ...data,
      painLevel: val
    });
  };
  const handleReadinessChange = (val: number) => {
    onChange({
      ...data,
      readiness: val
    });
  };
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Pain Level */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Nivel de Dolor (EVA)
        </h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="10"
              value={data.painLevel || 0}
              onChange={(e) => handlePainChange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />

            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0 (Sin dolor)</span>
              <span>5 (Moderado)</span>
              <span>10 (Máximo)</span>
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-600 border-4 border-blue-100">
            {data.painLevel}
          </div>
        </div>
      </div>

      {/* Readiness */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Disposición para entrenar (Readiness)
        </h3>
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4, 5].map((level) =>
          <button
            key={level}
            onClick={() => handleReadinessChange(level)}
            className={`flex-1 py-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center gap-2 ${data.readiness === level ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300 text-gray-500'}`}>

              {level <= 2 ?
            <Frown className="h-6 w-6" /> :
            level === 3 ?
            <Meh className="h-6 w-6" /> :

            <Smile className="h-6 w-6" />
            }
              <span className="font-bold text-lg">{level}</span>
            </button>
          )}
        </div>
      </div>

      {/* Goals & Notes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
        <Select
          label="Objetivo de la sesión"
          options={[
          {
            value: '',
            label: 'Seleccionar objetivo...'
          },
          {
            value: 'rom',
            label: 'Mejorar Rango de Movimiento'
          },
          {
            value: 'fuerza',
            label: 'Fuerza / Hipertrofia'
          },
          {
            value: 'control',
            label: 'Control Motor / Estabilidad'
          },
          {
            value: 'potencia',
            label: 'Potencia / Pliometría'
          },
          {
            value: 'metabolico',
            label: 'Capacidad Metabólica'
          }]
          }
          value={data.sessionGoal}
          onChange={(e) =>
          onChange({
            ...data,
            sessionGoal: e.target.value
          })
          } />


        <Textarea
          label="Lo más importante de hoy (Subjetivo)"
          placeholder="¿Cómo se siente el paciente? ¿Hubo dolor post-sesión anterior?"
          value={data.soapNote?.subjective}
          onChange={(e) =>
          onChange({
            ...data,
            soapNote: {
              ...data.soapNote!,
              subjective: e.target.value
            }
          })
          }
          rows={3} />

      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} size="lg">
          Continuar a Ejercicios
        </Button>
      </div>
    </div>);

};