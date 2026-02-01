import React from 'react';
import { SessionNote } from '../../lib/types';
import { Textarea } from '../ui/Textarea';
import { AISOAPGenerator } from '../ai/AISOAPGenerator';
import { FileImage, Sparkles } from 'lucide-react';
interface NotesTabProps {
  data: Partial<SessionNote>;
  onChange: (data: Partial<SessionNote>) => void;
}
export const NotesTab = ({ data, onChange }: NotesTabProps) => {
  const updateSoap = (field: keyof typeof data.soapNote, value: string) => {
    onChange({
      ...data,
      soapNote: {
        ...data.soapNote!,
        [field]: value
      }
    });
  };
  const handleAIGenerate = (generatedSoap: SessionNote['soapNote']) => {
    onChange({
      ...data,
      soapNote: generatedSoap
    });
  };
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">
            Nota Clínica (SOAP)
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            Documenta la sesión con el formato estándar
          </p>
        </div>
        <AISOAPGenerator sessionData={data} onGenerate={handleAIGenerate} />
      </div>

      {/* AI Hint */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100 rounded-lg p-4 flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-4 w-4 text-violet-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-violet-900">
            Asistente de IA disponible
          </p>
          <p className="text-sm text-violet-700 mt-0.5">
            Haz clic en "Generar con IA" para crear un borrador basado en los
            datos de la sesión (dolor: {data.painLevel}/10,{' '}
            {data.exerciseDoses?.length || 0} ejercicios realizados).
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Textarea
          label="S - Subjetivo (Síntomas y reporte del paciente)"
          value={data.soapNote?.subjective}
          onChange={(e) => updateSoap('subjective', e.target.value)}
          rows={3}
          placeholder="¿Qué refiere el paciente? Síntomas, sensaciones, preocupaciones..."
          className="bg-blue-50/30 focus:bg-white transition-colors" />


        <Textarea
          label="O - Objetivo (Hallazgos y datos de la sesión)"
          value={data.soapNote?.objective}
          onChange={(e) => updateSoap('objective', e.target.value)}
          rows={3}
          placeholder="Datos objetivos: EVA, ROM, fuerza, observaciones clínicas..." />


        <Textarea
          label="A - Análisis (Interpretación clínica)"
          value={data.soapNote?.analysis}
          onChange={(e) => updateSoap('analysis', e.target.value)}
          rows={3}
          placeholder="Interpretación de los hallazgos, evolución, pronóstico..." />


        <Textarea
          label="P - Plan (Próximos pasos)"
          value={data.soapNote?.plan}
          onChange={(e) => updateSoap('plan', e.target.value)}
          rows={3}
          placeholder="Plan de tratamiento, indicaciones, próxima cita..."
          className="bg-green-50/30 focus:bg-white transition-colors" />

      </div>

      <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 text-center hover:border-gray-400 hover:bg-gray-100 transition-colors cursor-pointer">
        <FileImage className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600 text-sm font-medium">
          Arrastra fotos o videos aquí
        </p>
        <p className="text-gray-400 text-xs mt-1">
          para adjuntar a la sesión (Demo)
        </p>
      </div>
    </div>);

};