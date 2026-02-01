import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Check, RefreshCw } from 'lucide-react';
import { SessionNote } from '../../lib/types';
import { useApp } from '../../context/AppContext';
interface AISOAPGeneratorProps {
  sessionData: Partial<SessionNote>;
  onGenerate: (soap: SessionNote['soapNote']) => void;
}
export const AISOAPGenerator = ({
  sessionData,
  onGenerate
}: AISOAPGeneratorProps) => {
  const { state } = useApp();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const patient = state.patients.find((p) => p.id === sessionData.patientId);
  const episode = state.episodes.find((e) => e.id === sessionData.episodeId);
  const generateSOAP = async () => {
    setIsGenerating(true);
    setIsGenerated(false);
    // Simular delay de generación
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const painLevel = sessionData.painLevel || 0;
    const readiness = sessionData.readiness || 3;
    const exercises = sessionData.exerciseDoses || [];
    const goal = sessionData.sessionGoal || 'Continuar rehabilitación';
    // Generar SOAP basado en los datos de la sesión
    const generatedSOAP: SessionNote['soapNote'] = {
      subjective: generateSubjective(painLevel, readiness, goal),
      objective: generateObjective(painLevel, exercises, episode),
      analysis: generateAnalysis(painLevel, readiness, episode),
      plan: generatePlan(painLevel, exercises, episode)
    };
    setIsGenerating(false);
    setIsGenerated(true);
    onGenerate(generatedSOAP);
    // Reset estado después de un momento
    setTimeout(() => setIsGenerated(false), 3000);
  };
  const generateSubjective = (
  pain: number,
  readiness: number,
  goal: string)
  : string => {
    const painDescriptions: Record<number, string> = {
      0: 'sin dolor',
      1: 'molestia mínima',
      2: 'dolor leve ocasional',
      3: 'dolor leve',
      4: 'dolor moderado-leve',
      5: 'dolor moderado',
      6: 'dolor moderado-alto',
      7: 'dolor significativo',
      8: 'dolor intenso',
      9: 'dolor muy intenso',
      10: 'dolor máximo'
    };
    const readinessDescriptions: Record<number, string> = {
      1: 'muy fatigado/a, con poca energía',
      2: 'algo cansado/a',
      3: 'en estado normal',
      4: 'con buena energía',
      5: 'muy motivado/a y con excelente disposición'
    };
    return `Paciente refiere ${painDescriptions[pain] || 'dolor moderado'} en la zona afectada. Se presenta ${readinessDescriptions[readiness] || 'en estado normal'} para la sesión de hoy. Objetivo de la sesión: ${goal || 'continuar con el plan de rehabilitación establecido'}.`;
  };
  const generateObjective = (
  pain: number,
  exercises: any[],
  episode: any)
  : string => {
    const exerciseCount = exercises.length;
    const phaseDescriptions: Record<string, string> = {
      acute: 'fase aguda de la lesión',
      subacute: 'fase subaguda de recuperación',
      remodeling: 'fase de remodelación tisular',
      return_to_sport: 'fase de retorno deportivo'
    };
    let objective = `EVA: ${pain}/10. `;
    if (episode) {
      objective += `Paciente en ${phaseDescriptions[episode.phase] || 'tratamiento activo'}. `;
    }
    if (exerciseCount > 0) {
      objective += `Se realizaron ${exerciseCount} ejercicios terapéuticos. `;
    }
    objective += `Tolerancia al ejercicio: ${pain <= 3 ? 'buena' : pain <= 6 ? 'moderada' : 'limitada'}. `;
    objective += `ROM y fuerza: ${pain <= 4 ? 'en progreso favorable' : 'requiere mayor trabajo'}.`;
    return objective;
  };
  const generateAnalysis = (
  pain: number,
  readiness: number,
  episode: any)
  : string => {
    let analysis = '';
    if (pain <= 3 && readiness >= 3) {
      analysis =
      'Evolución favorable. El paciente muestra buena respuesta al tratamiento con disminución progresiva del dolor y adecuada tolerancia a los ejercicios. ';
    } else if (pain <= 5) {
      analysis =
      'Evolución estable. Se observa respuesta moderada al tratamiento. El dolor se mantiene en niveles manejables durante las actividades terapéuticas. ';
    } else {
      analysis =
      'Evolución que requiere atención. El nivel de dolor limita la progresión del tratamiento. Se recomienda ajustar la intensidad de los ejercicios. ';
    }
    if (episode) {
      const phaseRecommendations: Record<string, string> = {
        acute: 'Mantener enfoque en control del dolor e inflamación.',
        subacute: 'Continuar progresión gradual de carga.',
        remodeling: 'Aumentar demanda funcional progresivamente.',
        return_to_sport: 'Integrar gestos deportivos específicos.'
      };
      analysis += phaseRecommendations[episode.phase] || '';
    }
    return analysis;
  };
  const generatePlan = (
  pain: number,
  exercises: any[],
  episode: any)
  : string => {
    let plan = '';
    if (pain <= 3) {
      plan =
      '• Continuar con el programa de ejercicios actual\n• Considerar progresión en carga/intensidad para próxima sesión\n';
    } else if (pain <= 6) {
      plan =
      '• Mantener programa actual sin progresión\n• Monitorear respuesta al ejercicio\n';
    } else {
      plan =
      '• Reducir intensidad de ejercicios\n• Aumentar componente de terapia manual\n• Considerar modalidades analgésicas\n';
    }
    plan += '• Próxima sesión en 48-72 horas\n';
    plan +=
    '• Indicaciones para domicilio: ejercicios de movilidad y crioterapia PRN';
    return plan;
  };
  return (
    <motion.button
      onClick={generateSOAP}
      disabled={isGenerating}
      whileHover={{
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      className={`
        relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
        ${isGenerated ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700'}
        disabled:opacity-70 disabled:cursor-not-allowed
      `}>

      <AnimatePresence mode="wait">
        {isGenerating ?
        <motion.div
          key="generating"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          className="flex items-center gap-2">

            <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}>

              <RefreshCw className="h-4 w-4" />
            </motion.div>
            <span>Generando con IA...</span>
          </motion.div> :
        isGenerated ?
        <motion.div
          key="generated"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          className="flex items-center gap-2">

            <Check className="h-4 w-4" />
            <span>¡Nota generada!</span>
          </motion.div> :

        <motion.div
          key="default"
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          exit={{
            opacity: 0,
            scale: 0.8
          }}
          className="flex items-center gap-2">

            <Sparkles className="h-4 w-4" />
            <span>Generar con IA</span>
          </motion.div>
        }
      </AnimatePresence>

      {/* Shimmer effect while generating */}
      {isGenerating &&
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-lg"
        animate={{
          x: ['-100%', '100%']
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }} />

      }
    </motion.button>);

};